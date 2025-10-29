# Skill Swap Platform
 To create a digital platform where students can exchange skills and knowledge with peers. The system enables users to list their expertise, request sessions from others, and track completed exchanges, fostering a collaborative learning community. 

 ---

### Project Structure
```
skillswap-platform/
│
├── pom.xml                                 # Maven configuration file
├── README.md
├── .gitignore
├── .env.example
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/skillswap/
│   │   │       ├── SkillSwapApplication.java          # Main entry point
│   │   │       │
│   │   │       ├── config/                            # Configuration classes
│   │   │       │   ├── SecurityConfig.java
│   │   │       │   ├── WebSocketConfig.java
│   │   │       │   ├── OpenAPIConfig.java
│   │   │       │   └── CorsConfig.java
│   │   │       │
│   │   │       ├── controller/                        # REST Controllers
│   │   │       │   ├── AuthController.java
│   │   │       │   ├── UserController.java
│   │   │       │   ├── SkillController.java
│   │   │       │   ├── MatchController.java
│   │   │       │   ├── SessionController.java
│   │   │       │   ├── ReviewController.java
│   │   │       │   └── NotificationController.java
│   │   │       │
│   │   │       ├── service/                           # Business Logic
│   │   │       │   ├── AuthService.java
│   │   │       │   ├── UserService.java
│   │   │       │   ├── SkillService.java
│   │   │       │   ├── MatchingService.java
│   │   │       │   ├── SessionService.java
│   │   │       │   ├── ReviewService.java
│   │   │       │   ├── EmailService.java
│   │   │       │   └── NotificationService.java
│   │   │       │
│   │   │       ├── repository/                        # Data Access Layer
│   │   │       │   ├── UserRepository.java
│   │   │       │   ├── SkillRepository.java
│   │   │       │   ├── SessionRepository.java
│   │   │       │   ├── ReviewRepository.java
│   │   │       │   ├── NotificationRepository.java
│   │   │       │   └── MatchPreferenceRepository.java
│   │   │       │
│   │   │       ├── entity/                            # JPA Entities
│   │   │       │   ├── User.java
│   │   │       │   ├── Skill.java
│   │   │       │   ├── Session.java
│   │   │       │   ├── Review.java
│   │   │       │   ├── Notification.java
│   │   │       │   ├── MatchPreference.java
│   │   │       │   └── BaseEntity.java
│   │   │       │
│   │   │       ├── dto/                               # Data Transfer Objects
│   │   │       │   ├── request/
│   │   │       │   │   ├── RegisterRequest.java
│   │   │       │   │   ├── LoginRequest.java
│   │   │       │   │   ├── SkillRequestDTO.java
│   │   │       │   │   ├── SessionRequestDTO.java
│   │   │       │   │   ├── ReviewRequestDTO.java
│   │   │       │   │   └── UpdateProfileDTO.java
│   │   │       │   │
│   │   │       │   └── response/
│   │   │       │       ├── AuthResponse.java
│   │   │       │       ├── UserResponseDTO.java
│   │   │       │       ├── SkillResponseDTO.java
│   │   │       │       ├── SessionResponseDTO.java
│   │   │       │       ├── ReviewResponseDTO.java
│   │   │       │       ├── ErrorResponse.java
│   │   │       │       └── ApiResponse.java
│   │   │       │
│   │   │       ├── mapper/                            # MapStruct Mappers
│   │   │       │   ├── UserMapper.java
│   │   │       │   ├── SkillMapper.java
│   │   │       │   ├── SessionMapper.java
│   │   │       │   └── ReviewMapper.java
│   │   │       │
│   │   │       ├── security/                          # Security Related
│   │   │       │   ├── JwtTokenUtil.java
│   │   │       │   ├── JwtAuthenticationFilter.java
│   │   │       │   ├── CustomUserDetailsService.java
│   │   │       │   └── SecurityUtils.java
│   │   │       │
│   │   │       ├── exception/                         # Exception Handling
│   │   │       │   ├── GlobalExceptionHandler.java
│   │   │       │   ├── ResourceNotFoundException.java
│   │   │       │   ├── ValidationException.java
│   │   │       │   ├── UnauthorizedException.java
│   │   │       │   ├── UserAlreadyExistsException.java
│   │   │       │   └── InvalidSessionException.java
│   │   │       │
│   │   │       ├── enums/                             # Enumerations
│   │   │       │   ├── Role.java
│   │   │       │   ├── SkillCategory.java
│   │   │       │   ├── SessionStatus.java
│   │   │       │   ├── NotificationStatus.java
│   │   │       │   └── ProficiencyLevel.java
│   │   │       │
│   │   │       ├── util/                              # Utility Classes
│   │   │       │   ├── DateUtil.java
│   │   │       │   ├── ValidationUtil.java
│   │   │       │   ├── StringUtil.java
│   │   │       │   └── Constants.java
│   │   │       │
│   │   │       └── listener/                          # Event Listeners
│   │   │           ├── SessionEventListener.java
│   │   │           └── UserRegistrationListener.java
│   │   │
│   │   └── resources/
│   │       ├── application.yml                         # Main configuration
│   │       ├── application-dev.yml                     # Development profile
│   │       ├── application-test.yml                    # Test profile
│   │       ├── application-prod.yml                    # Production profile
│   │       │
│   │       ├── templates/                              # Email templates
│   │       │   ├── session-confirmation.html
│   │       │   ├── session-reminder.html
│   │       │   └── review-request.html
│   │       │
│   │       ├── static/                                 # Static resources
│   │       │   ├── css/
│   │       │   ├── js/
│   │       │   └── images/
│   │       │
│   │       └── db/
│   │           ├── migration/                          # Flyway migrations (optional)
│   │           │   ├── V1__init.sql
│   │           │   └── V2__add_tables.sql
│   │           └── data.sql                            # Initial data
│   │
│   └── test/
│       ├── java/
│       │   └── com/skillswap/
│       │       ├── controller/
│       │       │   ├── AuthControllerTest.java
│       │       │   ├── SkillControllerTest.java
│       │       │   └── SessionControllerTest.java
│       │       │
│       │       ├── service/
│       │       │   ├── SkillServiceTest.java
│       │       │   ├── SessionServiceTest.java
│       │       │   └── MatchingServiceTest.java
│       │       │
│       │       ├── repository/
│       │       │   └── UserRepositoryTest.java
│       │       │
│       │       └── security/
│       │           └── JwtTokenUtilTest.java
│       │
│       └── resources/
│           ├── application-test.yml
│           └── test-data.sql

```

---