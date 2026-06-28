// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TodoList {
    enum Priority { Low, Medium, High }

    struct Todo {
        string content;
        bool completed;
        uint256 deadline; 
        Priority priority; 
    }

    // State Variables
    address public owner;
    uint256 public totalTodosAcrossNetwork; 
    mapping(address => Todo[]) private userTodos;

    // Events
    event TodoAdded(address indexed user, uint256 index, string content);
    event TodoToggled(address indexed user, uint256 index, bool status);
    event TodoDeleted(address indexed user, uint256 index);

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Hanya owner contract");
        _;
    }

    modifier validIndex(uint256 _index) {
        require(_index < userTodos[msg.sender].length, "Index tidak valid");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // --- Functions ---
    function addTodo(string calldata _content, uint256 _deadline, Priority _priority) external {
        require(bytes(_content).length > 0, "Konten tidak boleh kosong");
        
        Todo memory newTodo = Todo({
            content: _content,
            completed: false,
            deadline: _deadline,
            priority: _priority
        });

        userTodos[msg.sender].push(newTodo);
        totalTodosAcrossNetwork++;

        uint256 newIndex = userTodos[msg.sender].length - 1;
        emit TodoAdded(msg.sender, newIndex, _content);
    }

    function toggleTodo(uint256 _index) external validIndex(_index) {
        Todo storage todo = userTodos[msg.sender][_index];
        todo.completed = !todo.completed;
        emit TodoToggled(msg.sender, _index, todo.completed);
    }

    function deleteTodo(uint256 _index) external validIndex(_index) {
        uint256 lastIndex = userTodos[msg.sender].length - 1;
        
        if (_index != lastIndex) {
            userTodos[msg.sender][_index] = userTodos[msg.sender][lastIndex];
        }
        
        userTodos[msg.sender].pop();
        emit TodoDeleted(msg.sender, _index);
    }

    function getMyTodos() external view returns (Todo[] memory) {
        return userTodos[msg.sender];
    }

    function getMyTodoCount() external view returns (uint256) {
        return userTodos[msg.sender].length;
    }

    // FUNGSI BARU: Agar modifier onlyOwner digunakan dan bisa diuji
    function resetTotalTodos() external onlyOwner {
        totalTodosAcrossNetwork = 0;
    }
}