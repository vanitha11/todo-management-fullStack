package net.fullStack.todo.service;

import net.fullStack.todo.dto.JwtAuthResponseDto;
import net.fullStack.todo.dto.LoginDto;
import net.fullStack.todo.dto.RegisterDto;

public interface AuthService {

    String register(RegisterDto registerDto);

    JwtAuthResponseDto login(LoginDto loginDto);
}
