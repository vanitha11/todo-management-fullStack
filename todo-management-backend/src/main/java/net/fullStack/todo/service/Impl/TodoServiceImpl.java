package net.fullStack.todo.service.Impl;

import lombok.AllArgsConstructor;
import net.fullStack.todo.dto.TodoDto;
import net.fullStack.todo.entity.Todo;
import net.fullStack.todo.exception.ResourceNotFoundException;
import net.fullStack.todo.repository.TodoRepository;
import net.fullStack.todo.service.TodoService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {

    private TodoRepository todoRepository;
    private ModelMapper modelMapper;
    @Override
    public TodoDto addTodo(TodoDto todoDto) {
        //convert TodoDto to Todo Entity

        Todo todo = modelMapper.map(todoDto, Todo.class);

        //Todo JPA Entity
        Todo saveTodo = todoRepository.save(todo);

        // Convert Todo JPA entity to TodoDto

        TodoDto saveTodoDto = modelMapper.map(saveTodo, TodoDto.class);

        return saveTodoDto;
    }

    @Override
    public TodoDto getTodoById(Long id) {
        Todo todo = todoRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("Todo not found with id" + id));

        return modelMapper.map(todo, TodoDto.class);

    }

    @Override
    public List<TodoDto> getAllTodos() {
        List<Todo> todos = todoRepository.findAll();

        return todos.stream().map((todo) -> modelMapper.map(todo, TodoDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public TodoDto updateTodo(TodoDto todoDto, Long id) {
        Todo todo = todoRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("Todo not found with id" + id));
        todo.setTitle(todoDto.getTitle());
        todo.setDescription(todoDto.getDescription());
        todo.setCompleted(todoDto.isCompleted());

        Todo updatedTodo = todoRepository.save(todo);
        return modelMapper.map(updatedTodo, TodoDto.class);
    }

    @Override
    public void deleteTodo(Long id) {
        Todo todo = todoRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("Todo not found with id" + id));

        todoRepository.deleteById(id);
    }

    @Override
    public TodoDto completeTodo(Long id) {
        Todo todo = todoRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("Todo not found with id" + id));
        todo.setCompleted(Boolean.TRUE);

        Todo updatedTodo = todoRepository.save(todo);
        return modelMapper.map(updatedTodo, TodoDto.class);
    }

    @Override
    public TodoDto inCompleteTodo(Long id) {
        Todo todo = todoRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("Todo not found with id" + id));
        todo.setCompleted(Boolean.FALSE);

        Todo updatedTodo = todoRepository.save(todo);
        return modelMapper.map(updatedTodo, TodoDto.class);
    }
}
