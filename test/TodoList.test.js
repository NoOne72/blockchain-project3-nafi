import { expect } from "chai";
import hardhat from "hardhat";
const { ethers } = hardhat;

describe("TodoList Smart Contract", function () {
  let TodoList, todoList, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    TodoList = await ethers.getContractFactory("TodoList");
    todoList = await TodoList.deploy();
  });

  describe("Deployment", function () {
    it("1. Harus set owner dengan benar", async function () {
      expect(await todoList.owner()).to.equal(owner.address);
    });

    it("2. Inisialisasi totalTodosAcrossNetwork adalah 0", async function () {
      expect(await todoList.totalTodosAcrossNetwork()).to.equal(0);
    });
  });

  describe("Main Function (Positive Tests)", function () {
    it("3. Harus berhasil menambah Todo baru", async function () {
      const deadline = Math.floor(Date.now() / 1000) + 86400; // Besok
      await todoList.connect(addr1).addTodo("Belajar Blockchain", deadline, 2); 
      
      const todos = await todoList.connect(addr1).getMyTodos();
      expect(todos.length).to.equal(1);
      expect(todos[0].content).to.equal("Belajar Blockchain");
      expect(todos[0].completed).to.be.false;
    });

    it("4. Harus berhasil toggle status Todo", async function () {
      await todoList.connect(addr1).addTodo("Tugas 1", 0, 1);
      await todoList.connect(addr1).toggleTodo(0);
      
      const todos = await todoList.connect(addr1).getMyTodos();
      expect(todos[0].completed).to.be.true;
    });

    it("5. Harus berhasil menghapus Todo (Swap and Pop)", async function () {
      await todoList.connect(addr1).addTodo("Tugas A", 0, 0);
      await todoList.connect(addr1).addTodo("Tugas B", 0, 0);
      await todoList.connect(addr1).deleteTodo(0);

      const todos = await todoList.connect(addr1).getMyTodos();
      expect(todos.length).to.equal(1);
      expect(todos[0].content).to.equal("Tugas B"); 
    });
  });

  describe("Negative Tests", function () {
    it("6. Harus gagal toggle jika index tidak valid", async function () {
      await expect(todoList.connect(addr1).toggleTodo(0)).to.be.revertedWith("Index tidak valid");
    });

    it("7. Harus gagal menambah Todo jika konten kosong", async function () {
      await expect(todoList.connect(addr1).addTodo("", 0, 1)).to.be.revertedWith("Konten tidak boleh kosong");
    });
  });

  describe("Access Control & Data Isolation", function () {
    it("8. Setiap user harus memiliki list yang terpisah", async function () {
      await todoList.connect(addr1).addTodo("Tugas User 1", 0, 1);
      await todoList.connect(addr2).addTodo("Tugas User 2", 0, 1);

      const todosAddr1 = await todoList.connect(addr1).getMyTodos();
      const todosAddr2 = await todoList.connect(addr2).getMyTodos();

      expect(todosAddr1[0].content).to.equal("Tugas User 1");
      expect(todosAddr2[0].content).to.equal("Tugas User 2");
      expect(todosAddr1.length).to.equal(1);
      expect(todosAddr2.length).to.equal(1);
    });
  });

  describe("Events", function () {
    it("9. Harus emit event TodoAdded saat menambah tugas", async function () {
      await expect(todoList.connect(addr1).addTodo("Tugas Event", 0, 1))
        .to.emit(todoList, "TodoAdded")
        .withArgs(addr1.address, 0, "Tugas Event");
    });
  });

  // BLOK BARU UNTUK MENUTUP KEKURANGAN COVERAGE
  describe("Additional Functions & Modifiers Coverage", function () {
    it("10. Harus mengembalikan jumlah Todo yang benar menggunakan getMyTodoCount", async function () {
      await todoList.connect(addr1).addTodo("Tugas Hitung 1", 0, 1);
      await todoList.connect(addr1).addTodo("Tugas Hitung 2", 0, 1);
      
      const count = await todoList.connect(addr1).getMyTodoCount();
      expect(count).to.equal(2);
    });

    it("11. Harus memblokir eksekusi fungsi onlyOwner jika dipanggil bukan oleh owner", async function () {
      await expect(todoList.connect(addr1).resetTotalTodos()).to.be.revertedWith("Hanya owner contract");
    });

    it("12. Harus mengizinkan eksekusi fungsi onlyOwner jika dipanggil oleh owner", async function () {
      // Setup: Tambah 1 todo agar total > 0
      await todoList.connect(addr1).addTodo("Tugas Test", 0, 1);
      expect(await todoList.totalTodosAcrossNetwork()).to.equal(1);
      
      // Eksekusi fungsi onlyOwner
      await todoList.connect(owner).resetTotalTodos();
      
      // Validasi: Total harus kembali ke 0
      expect(await todoList.totalTodosAcrossNetwork()).to.equal(0);
    });
  });
});