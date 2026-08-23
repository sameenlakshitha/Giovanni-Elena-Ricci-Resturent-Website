package com.giovannielena.restaurant.config;

import com.giovannielena.restaurant.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.*;
import java.util.Arrays;

@Configuration
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtFilter;
    public SecurityConfig(JwtAuthenticationFilter jwtFilter){this.jwtFilter=jwtFilter;}
    @Bean SecurityFilterChain securityFilterChain(HttpSecurity http)throws Exception{
        http.csrf(AbstractHttpConfigurer::disable).cors(cors->{}).sessionManagement(s->s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(a->a.requestMatchers("/api/categories","/api/foods","/api/auth/**").permitAll().requestMatchers("/api/admin/**").hasRole("ADMIN").anyRequest().authenticated())
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
    @Bean PasswordEncoder passwordEncoder(){return new BCryptPasswordEncoder();}
    @Bean CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration c=new CorsConfiguration(); c.setAllowedOrigins(Arrays.asList("http://localhost:3000","http://localhost:5500","http://127.0.0.1:5500")); c.setAllowedMethods(Arrays.asList("GET","POST","PUT","PATCH","DELETE","OPTIONS")); c.setAllowedHeaders(Arrays.asList("Authorization","Content-Type")); c.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource s=new UrlBasedCorsConfigurationSource(); s.registerCorsConfiguration("/**",c); return s;
    }
}