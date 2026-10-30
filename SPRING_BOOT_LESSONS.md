# Spring Boot Complete Lessons (English & Khmer)

> **Comprehensive Guide & Study Materials for Spring Boot Backend Development**  
> Total Questions: **180** | Lessons: **9 Chapters** | Bilingual: **English & Khmer (ភាសាខ្មែរ)**

## 📑 Table of Contents

1. [1. Spring Boot Fundamentals](#1-spring-boot-fundamentals) (15 questions)
2. [2. IoC, DI, and Spring Beans](#2-ioc-di-and-spring-beans) (21 questions)
3. [3. Spring Boot Annotations](#3-spring-boot-annotations) (27 questions)
4. [4. Spring Boot Project Structure and Configuration](#4-spring-boot-project-structure-and-configuration) (17 questions)
5. [5. Spring MVC and REST API](#5-spring-mvc-and-rest-api) (20 questions)
6. [6. DTO and Layered Architecture](#6-dto-and-layered-architecture) (14 questions)
7. [7. Spring Data JPA and Hibernate Integration](#7-spring-data-jpa-and-hibernate-integration) (24 questions)
8. [8. Validation and Exception Handling](#8-validation-and-exception-handling) (17 questions)
9. [9. Spring Security and JWT](#9-spring-security-and-jwt) (25 questions)

---

## 1. Spring Boot Fundamentals

### 1. What is Spring Boot?

#### 🇺🇸 English

Spring Boot is a Java-based framework built on top of the Spring Framework. It simplifies application development by providing auto-configuration, starter dependencies, and embedded servers. It helps developers build standalone, production-ready applications with less configuration.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Spring Boot គឺជា Framework ដែលបង្កើតឡើងដោយផ្អែកលើ Spring Framework។ វាជួយសម្រួលការបង្កើតកម្មវិធី Java ដោយមាន Auto-configuration, Starter Dependencies និង Embedded Server។ វាអនុញ្ញាតឱ្យ Developer បង្កើតកម្មវិធីដែលអាចដំណើរការដោយខ្លួនឯង ដោយមិនចាំបាច់កំណត់រចនាសម្ព័ន្ធច្រើន។

---

### 2. Why do we use Spring Boot?

#### 🇺🇸 English

We use Spring Boot because it reduces configuration and development time. It provides ready-to-use dependencies, automatic configuration, and embedded servers. This allows developers to focus more on business logic instead of setting up the application manually.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

យើងប្រើ Spring Boot ព្រោះវាជួយកាត់បន្ថយការកំណត់ Configuration និងពេលវេលាអភិវឌ្ឍកម្មវិធី។ វាផ្តល់នូវ Dependencies ដែលអាចប្រើបានភ្លាមៗ, Auto-configuration និង Embedded Server។ ដូច្នេះ Developer អាចផ្តោតលើ Business Logic ជាជាងការកំណត់ប្រព័ន្ធដោយដៃ។

---

### 3. What are the main features of Spring Boot?

#### 🇺🇸 English

The main features of Spring Boot include:
1. Auto-configuration.
2. Starter dependencies.
3. Embedded servers.
4. Production-ready features through Actuator.
5. Externalized configuration.
6. Easy integration with databases and other technologies.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

លក្ខណៈពិសេសសំខាន់ៗរបស់ Spring Boot រួមមាន៖
1. Auto-configuration – កំណត់រចនាសម្ព័ន្ធដោយស្វ័យប្រវត្តិ។
2. Starter dependencies – ផ្តល់ Dependencies ដែលត្រៀមរួចជាស្រេច។
3. Embedded servers – មាន Server ភ្ជាប់មកជាមួយ។
4. Actuator – ជួយត្រួតពិនិត្យកម្មវិធី។
5. Externalized configuration – អាចកំណត់ Configuration ពីខាងក្រៅ។
6. ងាយស្រួលភ្ជាប់ជាមួយ Database និង Technology ផ្សេងៗ។

---

### 4. What are the advantages of Spring Boot?

#### 🇺🇸 English

The advantages of Spring Boot are faster development, less configuration, easy dependency management, embedded servers, and easy deployment. It also supports building REST APIs and microservices.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

អត្ថប្រយោជន៍របស់ Spring Boot គឺជួយឱ្យការអភិវឌ្ឍកម្មវិធីលឿនជាងមុន កាត់បន្ថយការកំណត់ Configuration ងាយស្រួលគ្រប់គ្រង Dependencies មាន Embedded Server និងងាយស្រួល Deploy។ វាក៏គាំទ្រការបង្កើត REST API និង Microservices ផងដែរ។

---

### 5. What is the difference between Spring and Spring Boot?

#### 🇺🇸 English

Spring is a Java framework that provides features such as Dependency Injection, Spring MVC, and transaction management. Spring Boot is built on top of Spring and simplifies development by providing auto-configuration, starter dependencies, and embedded servers.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Spring គឺជា Java Framework ដែលផ្តល់មុខងារដូចជា Dependency Injection, Spring MVC និង Transaction Management។

Spring Boot ត្រូវបានបង្កើតឡើងដោយផ្អែកលើ Spring ហើយជួយសម្រួលការអភិវឌ្ឍដោយមាន Auto-configuration, Starter Dependencies និង Embedded Server។

---

### 6. What is Spring Initializr?

#### 🇺🇸 English

Spring Initializr is a web-based tool that helps developers generate a Spring Boot project. We can select the project type, programming language, Spring Boot version, and required dependencies.

Website: https://start.spring.io

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Spring Initializr គឺជា Tool តាមរយៈ Website ដែលជួយ Developer បង្កើត Spring Boot Project។ យើងអាចជ្រើសរើស Project Type, Programming Language, Spring Boot Version និង Dependencies ដែលត្រូវការ។

---

### 7. What is Spring Boot Starter?

#### 🇺🇸 English

A Spring Boot Starter is a dependency package that groups commonly used libraries for a specific purpose. For example, spring-boot-starter-web provides the dependencies needed to build web applications and REST APIs.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Spring Boot Starter គឺជា Dependency Package ដែលប្រមូលផ្តុំ Libraries ដែលត្រូវការសម្រាប់មុខងារជាក់លាក់មួយ។ ឧទាហរណ៍ spring-boot-starter-web ផ្តល់ Libraries ដែលត្រូវការសម្រាប់បង្កើត Web Application និង REST API។

---

### 8. What is an embedded server?

#### 🇺🇸 English

An embedded server is a web server included inside an application. It allows a Spring Boot application to run independently without requiring a separately installed application server.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Embedded Server គឺជា Web Server ដែលបានបញ្ចូលនៅក្នុង Application។ វាអនុញ្ញាតឱ្យ Spring Boot Application ដំណើរការដោយខ្លួនឯង ដោយមិនចាំបាច់ដំឡើង Application Server ដាច់ដោយឡែក។

---

### 9. What is the default server used by Spring Boot?

#### 🇺🇸 English

Spring Boot uses Apache Tomcat as the default embedded server when we use the Spring MVC web starter.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Spring Boot ប្រើ Apache Tomcat ជា Embedded Server លំនាំដើម នៅពេលយើងប្រើ Spring MVC Web Starter។

---

### 10. Can we change Tomcat to Jetty or Undertow?

#### 🇺🇸 English

Yes. We can replace Tomcat with Jetty or Undertow by excluding the Tomcat dependency and adding the alternative server dependency in the project configuration.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

បាន។ យើងអាចប្តូរ Tomcat ទៅជា Jetty ឬ Undertow ដោយដក Tomcat Dependency ចេញ ហើយបន្ថែម Dependency របស់ Server ថ្មីនៅក្នុង Project Configuration។

---

### 11. What is auto-configuration?

#### 🇺🇸 English

Auto-configuration is a Spring Boot feature that automatically configures application components based on the dependencies available in the project and the existing configuration.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Auto-configuration គឺជាមុខងាររបស់ Spring Boot ដែលកំណត់រចនាសម្ព័ន្ធ Component របស់ Application ដោយស្វ័យប្រវត្តិ ដោយផ្អែកលើ Dependencies ដែលមានក្នុង Project និង Configuration ដែលមានស្រាប់។

---

### 12. How does Spring Boot auto-configuration work?

#### 🇺🇸 English

Spring Boot checks the dependencies available on the classpath and evaluates conditional configurations. If the required classes are available and a particular Bean has not already been defined, Spring Boot can automatically create the required Bean.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Spring Boot ពិនិត្យ Dependencies ដែលមាននៅក្នុង Classpath ហើយវាយតម្លៃលក្ខខណ្ឌ Configuration ផ្សេងៗ។ ប្រសិនបើ Class ដែលត្រូវការមាន ហើយមិនទាន់មាន Bean ដែលបានបង្កើតដោយយើងទេ Spring Boot អាចបង្កើត Bean នោះដោយស្វ័យប្រវត្តិ។

---

### 13. What is the Spring Boot application lifecycle?

#### 🇺🇸 English

The Spring Boot application lifecycle describes the stages an application goes through when starting, running, and shutting down. It includes creating the Spring ApplicationContext, registering Beans, injecting dependencies, initializing components, starting the embedded server, and closing resources during shutdown.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Spring Boot Application Lifecycle គឺជាដំណាក់កាលដែល Application ឆ្លងកាត់នៅពេលចាប់ផ្តើម ដំណើរការ និងបិទ។ វារួមមានការបង្កើត ApplicationContext ចុះបញ្ជី Beans ចាក់បញ្ចូល Dependencies ចាប់ផ្តើម Components ដំណើរការ Embedded Server និងបិទ Resources នៅពេលបញ្ចប់កម្មវិធី។

---

### 14. What happens when we run a Spring Boot application?

#### 🇺🇸 English

When we run a Spring Boot application, the main() method calls SpringApplication.run(). Spring Boot prepares the environment, creates the ApplicationContext, performs component scanning and auto-configuration, creates and initializes Beans, and starts the embedded web server if the application is a web application.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

នៅពេលយើងដំណើរការ Spring Boot Application វានឹងហៅ SpringApplication.run() ពីក្នុង main() Method។ បន្ទាប់មក Spring Boot រៀបចំ Environment បង្កើត ApplicationContext ស្វែងរក Components អនុវត្ត Auto-configuration បង្កើត និងចាប់ផ្តើម Beans ហើយដំណើរការ Embedded Web Server ប្រសិនបើជា Web Application។

---

### 15. What is the purpose of @SpringBootApplication?

#### 🇺🇸 English

@SpringBootApplication is the main annotation used to start and configure a Spring Boot application. It combines three annotations: @SpringBootConfiguration, @EnableAutoConfiguration, and @ComponentScan.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@SpringBootApplication គឺជា Annotation សំខាន់ដែលប្រើសម្រាប់ចាប់ផ្តើម និងកំណត់ Configuration របស់ Spring Boot Application។ វារួមបញ្ចូល Annotations ចំនួនបីគឺ @SpringBootConfiguration, @EnableAutoConfiguration និង @ComponentScan។

---

## 2. IoC, DI, and Spring Beans

### 16. What is IoC (Inversion of Control)?

#### 🇺🇸 English

IoC stands for Inversion of Control. It is a principle where the responsibility for creating and managing objects is transferred from the developer to an external container, such as the Spring IoC Container.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

IoC មានន័យថា Inversion of Control។ វាជាគោលការណ៍ដែលផ្ទេរការទទួលខុសត្រូវក្នុងការបង្កើត និងគ្រប់គ្រង Objects ពី Developer ទៅឱ្យ Container ខាងក្រៅ ដូចជា Spring IoC Container។

---

### 17. What is DI (Dependency Injection)?

#### 🇺🇸 English

DI stands for Dependency Injection. It is a technique where an object receives the other objects it needs from an external source instead of creating them manually. Spring provides these dependencies through its IoC Container.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

DI មានន័យថា Dependency Injection។ វាជាបច្ចេកទេសដែល Object មួយទទួលបាន Objects ផ្សេងទៀតដែលវាត្រូវការ ពីប្រភពខាងក្រៅ ជំនួសឱ្យការបង្កើត Objects ទាំងនោះដោយខ្លួនឯង។ Spring ផ្តល់ Dependencies ទាំងនេះតាមរយៈ IoC Container។

---

### 18. What is the relationship between IoC and DI?

#### 🇺🇸 English

IoC is the principle of transferring object management to an external container, while DI is a technique used to achieve IoC by providing objects with the dependencies they need.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

IoC គឺជាគោលការណ៍នៃការផ្ទេរការគ្រប់គ្រង Objects ទៅឱ្យ Container ខាងក្រៅ។ ចំណែក DI គឺជាបច្ចេកទេសដែលប្រើដើម្បីអនុវត្តគោលការណ៍ IoC ដោយផ្តល់ Dependencies ដែល Object ត្រូវការឱ្យវា។

---

### 19. What is a Spring Bean?

#### 🇺🇸 English

A Spring Bean is an object that is created, configured, and managed by the Spring IoC Container. We can define Beans using annotations such as @Component, @Service, and @Repository, or through @Bean methods.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Spring Bean គឺជា Object ដែលត្រូវបានបង្កើត កំណត់ Configuration និងគ្រប់គ្រងដោយ Spring IoC Container។ យើងអាចកំណត់ Bean ដោយប្រើ Annotations ដូចជា @Component, @Service, @Repository ឬតាមរយៈ Method ដែលមាន @Bean។

---

### 20. What is the IoC Container?

#### 🇺🇸 English

The IoC Container is the core part of Spring that creates, configures, injects dependencies into, and manages Spring Beans throughout their lifecycle.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

IoC Container គឺជាផ្នែកស្នូលរបស់ Spring ដែលមានតួនាទីបង្កើត កំណត់ Configuration ចាក់បញ្ចូល Dependencies និងគ្រប់គ្រង Spring Beans ពេញមួយ Lifecycle របស់វា។

---

### 21. What is ApplicationContext?

#### 🇺🇸 English

ApplicationContext is an advanced Spring IoC Container. It manages Beans and provides additional features such as event handling, internationalization, resource loading, and application configuration.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

ApplicationContext គឺជា Spring IoC Container ដែលមានមុខងារបន្ថែម។ វាគ្រប់គ្រង Beans និងផ្តល់មុខងារដូចជា Event Handling, Internationalization, Resource Loading និង Application Configuration។

---

### 22. What is BeanFactory?

#### 🇺🇸 English

BeanFactory is the basic Spring IoC Container responsible for creating and managing Beans and providing Dependency Injection.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

BeanFactory គឺជា Spring IoC Container មូលដ្ឋានដែលមានតួនាទីបង្កើត និងគ្រប់គ្រង Beans ព្រមទាំងផ្តល់ Dependency Injection។

---

### 23. What is the difference between BeanFactory and ApplicationContext?

#### 🇺🇸 English

BeanFactory provides basic Bean management and Dependency Injection. ApplicationContext extends BeanFactory and provides additional features such as event publishing, internationalization, and easier integration with Spring applications.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

BeanFactory ផ្តល់មុខងារមូលដ្ឋានសម្រាប់គ្រប់គ្រង Beans និង Dependency Injection។ ApplicationContext ពង្រីកសមត្ថភាពពី BeanFactory ដោយបន្ថែមមុខងារដូចជា Event Publishing, Internationalization និងការរួមបញ្ចូលជាមួយ Spring Application កាន់តែងាយស្រួល។

---

### 24. What is the @Bean annotation?

#### 🇺🇸 English

@Bean is an annotation used on a method inside a configuration class to tell Spring that the object returned by that method should be registered and managed as a Spring Bean.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@Bean គឺជា Annotation ដែលប្រើលើ Method នៅក្នុង Configuration Class ដើម្បីប្រាប់ Spring ថា Object ដែល Method នោះ Return មកត្រូវចុះបញ្ជី និងគ្រប់គ្រងជាមួយ Spring Bean។

**ឧទាហរណ៍ (Example):**
`java
@Configuration
public class AppConfig {

    @Bean
    public MyService myService() {
        return new MyService();
    }
}
`

---

### 25. What is the @Component annotation?

#### 🇺🇸 English

@Component is an annotation that marks a Java class as a Spring-managed component. Spring can discover it through component scanning and register it as a Bean.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@Component គឺជា Annotation ដែលសម្គាល់ Java Class មួយថាជា Component ដែល Spring ត្រូវគ្រប់គ្រង។ Spring អាចស្វែងរក Class នោះតាមរយៈ Component Scanning ហើយចុះបញ្ជីវាជា Bean។

---

### 26. What is the difference between @Bean and @Component?

#### 🇺🇸 English

@Component is placed directly on a class so Spring can discover and register that class as a Bean. @Bean is placed on a method inside a configuration class to register the object returned by that method as a Bean.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@Component ដាក់ដោយផ្ទាល់លើ Class ដើម្បីឱ្យ Spring ស្វែងរក និងចុះបញ្ជី Class នោះជា Bean។ ចំណែក @Bean ដាក់លើ Method នៅក្នុង Configuration Class ដើម្បីចុះបញ្ជី Object ដែល Method នោះ Return មកជា Bean។

---

### 27. What is the @Configuration annotation?

#### 🇺🇸 English

@Configuration marks a class as a source of Bean definitions. It allows us to define Beans using methods annotated with @Bean.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@Configuration គឺជា Annotation ដែលសម្គាល់ Class មួយថាជាប្រភពសម្រាប់កំណត់ Bean។ វាអនុញ្ញាតឱ្យយើងបង្កើត Beans តាមរយៈ Methods ដែលប្រើ @Bean។

---

### 28. What is @Autowired?

#### 🇺🇸 English

@Autowired is an annotation that tells Spring to automatically inject a required dependency into a class. It can be used with constructors, setters, or fields.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@Autowired គឺជា Annotation ដែលប្រាប់ Spring ឱ្យចាក់បញ្ចូល Dependency ដែលត្រូវការទៅក្នុង Class ដោយស្វ័យប្រវត្តិ។ វាអាចប្រើជាមួយ Constructor, Setter ឬ Field។

---

### 29. What is @Qualifier?

#### 🇺🇸 English

@Qualifier is used when multiple Beans of the same type exist. It tells Spring exactly which Bean should be injected.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@Qualifier ប្រើនៅពេលមាន Beans ច្រើនដែលមាន Type ដូចគ្នា។ វាប្រាប់ Spring ឱ្យដឹងច្បាស់ថាត្រូវចាក់បញ្ចូល Bean មួយណា។

---

### 30. What is @Primary?

#### 🇺🇸 English

@Primary marks a Bean as the preferred candidate when multiple Beans of the same type are available. Spring will choose it by default unless a specific Bean is selected using @Qualifier.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@Primary គឺជា Annotation ដែលសម្គាល់ Bean មួយថាជាជម្រើសអាទិភាព នៅពេលមាន Beans ច្រើនដែលមាន Type ដូចគ្នា។ Spring នឹងជ្រើសរើស Bean នោះជាលំនាំដើម លុះត្រាតែយើងប្រើ @Qualifier ដើម្បីជ្រើសរើស Bean ផ្សេងជាក់លាក់។

---

### 31. What are the types of Dependency Injection?

#### 🇺🇸 English

Spring supports three common types of Dependency Injection:
1. Constructor Injection.
2. Setter Injection.
3. Field Injection.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Spring គាំទ្រ Dependency Injection សំខាន់ៗចំនួនបីប្រភេទ៖
1. Constructor Injection – ចាក់បញ្ចូលតាម Constructor។
2. Setter Injection – ចាក់បញ្ចូលតាម Setter Method។
3. Field Injection – ចាក់បញ្ចូលតាម Field។

---

### 32. What is constructor injection?

#### 🇺🇸 English

Constructor Injection is a technique where dependencies are provided through a class constructor. It makes required dependencies explicit and supports immutable fields and easier unit testing.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Constructor Injection គឺជាបច្ចេកទេសដែលផ្តល់ Dependencies តាមរយៈ Constructor របស់ Class។ វាធ្វើឱ្យ Dependencies ដែលត្រូវការមានភាពច្បាស់លាស់ អាចប្រើ Field ដែលមិនអាចកែប្រែបាន និងងាយស្រួលសម្រាប់ Unit Testing។

**ឧទាហរណ៍ (Example):**
`java
@Service
public class StudentService {

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }
}
`

---

### 33. What is setter injection?

#### 🇺🇸 English

Setter Injection is a technique where dependencies are provided through setter methods. It is useful when a dependency is optional or may need to be changed after object creation.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Setter Injection គឺជាបច្ចេកទេសដែលផ្តល់ Dependencies តាមរយៈ Setter Methods។ វាមានប្រយោជន៍នៅពេល Dependency មួយមិនមែនជាតម្រូវការចាំបាច់ ឬអាចត្រូវផ្លាស់ប្តូរក្រោយពេលបង្កើត Object។

---

### 34. What is field injection?

#### 🇺🇸 English

Field Injection is a technique where Spring injects dependencies directly into class fields using @Autowired. However, it is generally discouraged because it makes unit testing and dependency management harder.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Field Injection គឺជាបច្ចេកទេសដែល Spring ចាក់បញ្ចូល Dependencies ដោយផ្ទាល់ទៅក្នុង Fields របស់ Class ដោយប្រើ @Autowired។ ប៉ុន្តែជាទូទៅវាមិនត្រូវបានណែនាំទេ ព្រោះវាធ្វើឱ្យ Unit Testing និងការគ្រប់គ្រង Dependencies កាន់តែពិបាក។

---

### 35. Which injection method is recommended in Spring Boot?

#### 🇺🇸 English

Constructor Injection is recommended because it makes dependencies clear, supports immutable fields, prevents objects from being created without required dependencies, and makes unit testing easier.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Constructor Injection ត្រូវបានណែនាំ ព្រោះវាបង្ហាញ Dependencies ឱ្យច្បាស់ គាំទ្រ Immutable Fields ការពារការបង្កើត Object ដោយគ្មាន Dependencies ដែលចាំបាច់ និងធ្វើឱ្យ Unit Testing កាន់តែងាយស្រួល។

---

### 36. What happens if Spring cannot find a required Bean?

#### 🇺🇸 English

Spring throws an exception during application startup, usually a NoSuchBeanDefinitionException or an UnsatisfiedDependencyException. The application may fail to start because a required dependency cannot be injected.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

ប្រសិនបើ Spring មិនអាចរកឃើញ Bean ដែលត្រូវការទេ វានឹងបោះ Exception នៅពេលចាប់ផ្តើម Application ជាធម្មតា NoSuchBeanDefinitionException ឬ UnsatisfiedDependencyException។ Application អាចមិនអាចចាប់ផ្តើមបាន ព្រោះ Dependency ដែលចាំបាច់មិនអាចចាក់បញ្ចូលបាន។

---

## 3. Spring Boot Annotations

### 37. What is an annotation?

#### 🇺🇸 English

An annotation is metadata added to Java code to provide information to the compiler, framework, or runtime. In Spring Boot, annotations tell Spring how to configure and manage application components.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Annotation គឺជា Metadata ដែលបន្ថែមទៅក្នុង Java Code ដើម្បីផ្តល់ព័ត៌មានដល់ Compiler, Framework ឬ Runtime។ នៅក្នុង Spring Boot វាប្រាប់ Spring ពីរបៀបកំណត់ Configuration និងគ្រប់គ្រង Components របស់ Application។

---

### 38. What is @SpringBootApplication?

#### 🇺🇸 English

It is the main annotation used to mark the entry point of a Spring Boot application. It combines configuration, auto-configuration, and component scanning.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

វាជា Annotation សំខាន់ដែលប្រើសម្រាប់សម្គាល់ Entry Point របស់ Spring Boot Application។ វារួមបញ្ចូល Configuration, Auto-configuration និង Component Scanning។

---

### 39. What are the three annotations inside @SpringBootApplication?

#### 🇺🇸 English

It combines:
1. @SpringBootConfiguration – Marks the class as a configuration class.
2. @EnableAutoConfiguration – Enables automatic configuration.
3. @ComponentScan – Scans packages for Spring components.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

វារួមបញ្ចូល Annotations ចំនួនបី៖
1. @SpringBootConfiguration – សម្គាល់ Class ថាជា Configuration Class។
2. @EnableAutoConfiguration – បើកមុខងារ Auto-configuration។
3. @ComponentScan – ស្វែងរក Spring Components នៅក្នុង Packages។

---

### 40. What is @EnableAutoConfiguration?

#### 🇺🇸 English

@EnableAutoConfiguration tells Spring Boot to automatically configure the application based on the dependencies and configuration available in the project.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@EnableAutoConfiguration ប្រាប់ Spring Boot ឱ្យកំណត់ Configuration របស់ Application ដោយស្វ័យប្រវត្តិ ដោយផ្អែកលើ Dependencies និង Configuration ដែលមាននៅក្នុង Project។

---

### 41. What is @ComponentScan?

#### 🇺🇸 English

@ComponentScan tells Spring to scan specified packages for classes annotated with annotations such as @Component, @Service, and @Repository, and register them as Beans.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@ComponentScan ប្រាប់ Spring ឱ្យស្វែងរក Classes នៅក្នុង Packages ដែលបានកំណត់ ដែលមាន Annotations ដូចជា @Component, @Service និង @Repository ហើយចុះបញ្ជីពួកវាជា Beans។

---

### 42. What is @Component?

#### 🇺🇸 English

@Component marks a Java class as a Spring-managed component. Spring detects it through component scanning and registers it as a Bean.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@Component សម្គាល់ Java Class ថាជា Component ដែល Spring គ្រប់គ្រង។ Spring ស្វែងរកវាតាមរយៈ Component Scanning ហើយចុះបញ្ជីវាជា Bean។

---

### 43. What is @Service?

#### 🇺🇸 English

@Service marks a class as a service component. It is commonly used for business logic, such as processing student information or handling user registration.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@Service សម្គាល់ Class ថាជា Service Component។ វាត្រូវបានប្រើជាទូទៅសម្រាប់ Business Logic ដូចជាការដំណើរការព័ត៌មាន Student ឬការគ្រប់គ្រងការចុះឈ្មោះ User។

---

### 44. What is @Repository?

#### 🇺🇸 English

@Repository marks a class as a data access component. It is used to communicate with the database and can translate certain persistence-related exceptions into Spring's DataAccessException hierarchy.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@Repository សម្គាល់ Class ថាជា Component សម្រាប់ចូលប្រើ Database។ វាប្រើសម្រាប់ទំនាក់ទំនងជាមួយ Database ហើយអាចបម្លែង Persistence Exceptions មួយចំនួនទៅជា Spring DataAccessException។

---

### 45. What is @Controller?

#### 🇺🇸 English

@Controller marks a class as a Spring MVC controller. It handles incoming web requests and commonly returns view names for server-side rendering.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@Controller សម្គាល់ Class ថាជា Spring MVC Controller។ វាគ្រប់គ្រង Web Requests ដែលចូលមក ហើយជាទូទៅ Return View Names សម្រាប់បង្ហាញទំព័រនៅខាង Server។

---

### 46. What is @RestController?

#### 🇺🇸 English

@RestController marks a class as a REST API controller. It handles HTTP requests and returns data directly, usually in JSON format, instead of returning view names.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@RestController សម្គាល់ Class ថាជា REST API Controller។ វាគ្រប់គ្រង HTTP Requests ហើយ Return ទិន្នន័យដោយផ្ទាល់ ជាទូទៅក្នុងទម្រង់ JSON ជំនួសឱ្យការបញ្ជូន View Name។

---

### 47. What is the difference between @Controller and @RestController?

#### 🇺🇸 English

@Controller is mainly used for returning views, while @RestController is used for returning data such as JSON. @RestController combines @Controller and @ResponseBody.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@Controller ប្រើជាចម្បងសម្រាប់ Return Views ឬទំព័រ។ ចំណែក @RestController ប្រើសម្រាប់ Return ទិន្នន័យដូចជា JSON។ @RestController រួមបញ្ចូល @Controller និង @ResponseBody។

---

### 48. What is @RequestMapping?

#### 🇺🇸 English

@RequestMapping maps HTTP requests to a controller class or method. We can configure the URL path, HTTP method, and other request conditions.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@RequestMapping ប្រើសម្រាប់ភ្ជាប់ HTTP Requests ទៅកាន់ Controller Class ឬ Method។ យើងអាចកំណត់ URL Path, HTTP Method និងលក្ខខណ្ឌ Request ផ្សេងៗ។

---

### 49. What is @GetMapping?

#### 🇺🇸 English

@GetMapping maps HTTP GET requests to a controller method. It is commonly used to retrieve data from the server.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@GetMapping ប្រើសម្រាប់ភ្ជាប់ HTTP GET Request ទៅកាន់ Controller Method។ វាត្រូវបានប្រើជាទូទៅសម្រាប់ទាញយកទិន្នន័យពី Server។

---

### 50. What is @PostMapping?

#### 🇺🇸 English

@PostMapping maps HTTP POST requests to a controller method. It is commonly used to create new resources or submit data to the server.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@PostMapping ប្រើសម្រាប់ភ្ជាប់ HTTP POST Request ទៅកាន់ Controller Method។ វាត្រូវបានប្រើជាទូទៅសម្រាប់បង្កើត Resource ថ្មី ឬផ្ញើទិន្នន័យទៅ Server។

---

### 51. What is @PutMapping?

#### 🇺🇸 English

@PutMapping maps HTTP PUT requests to a controller method. It is commonly used to replace or update an existing resource.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@PutMapping ប្រើសម្រាប់ភ្ជាប់ HTTP PUT Request ទៅកាន់ Controller Method។ វាត្រូវបានប្រើជាទូទៅសម្រាប់ជំនួស ឬធ្វើបច្ចុប្បន្នភាព Resource ដែលមានស្រាប់។

---

### 52. What is @PatchMapping?

#### 🇺🇸 English

@PatchMapping maps HTTP PATCH requests to a controller method. It is commonly used to update only specific fields of an existing resource.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@PatchMapping ប្រើសម្រាប់ភ្ជាប់ HTTP PATCH Request ទៅកាន់ Controller Method។ វាត្រូវបានប្រើជាទូទៅសម្រាប់ធ្វើបច្ចុប្បន្នភាពតែ Fields មួយចំនួននៃ Resource ដែលមានស្រាប់។

---

### 53. What is @DeleteMapping?

#### 🇺🇸 English

@DeleteMapping maps HTTP DELETE requests to a controller method. It is commonly used to delete an existing resource.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@DeleteMapping ប្រើសម្រាប់ភ្ជាប់ HTTP DELETE Request ទៅកាន់ Controller Method។ វាត្រូវបានប្រើជាទូទៅសម្រាប់លុប Resource ដែលមានស្រាប់។

---

### 54. What is @PathVariable?

#### 🇺🇸 English

@PathVariable extracts a value from the URL path and passes it to a controller method parameter.

**Example:**
`java
@GetMapping("/students/{id}")
public Student getStudent(@PathVariable Long id) {
    return studentService.getStudent(id);
}


For /students/5, the value of id is 5.
`

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@PathVariable ប្រើសម្រាប់យកតម្លៃចេញពី URL Path ហើយបញ្ជូនវាទៅ Parameter របស់ Controller Method។

ឧទាហរណ៍៖ នៅពេល URL គឺ /students/5 វានឹងយកតម្លៃ 5 មកដាក់ក្នុង Variable id។

---

### 55. What is @RequestParam?

#### 🇺🇸 English

@RequestParam extracts query parameters from a URL and passes them to a controller method.

**Example:**
`java
@GetMapping("/students")
public List<Student> search(
        @RequestParam String name) {
    return studentService.search(name);
}


URL: /students?name=Leang
`

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@RequestParam ប្រើសម្រាប់យក Query Parameters ពី URL ហើយបញ្ជូនទៅ Controller Method។

ឧទាហរណ៍៖ URL /students?name=Leang នឹងយកតម្លៃ Leang មកដាក់ក្នុង Parameter name។

---

### 56. What is @RequestBody?

#### 🇺🇸 English

@RequestBody tells Spring to read the request body and convert its JSON data into a Java object.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@RequestBody ប្រាប់ Spring ឱ្យអានទិន្នន័យនៅក្នុង Request Body ហើយបម្លែង JSON ទៅជា Java Object។

---

### 57. What is @ResponseBody?

#### 🇺🇸 English

@ResponseBody tells Spring to write the returned object directly into the HTTP response body, usually converting it into JSON.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@ResponseBody ប្រាប់ Spring ឱ្យបញ្ជូន Object ដែលបាន Return ដោយផ្ទាល់ទៅក្នុង HTTP Response Body ជាទូទៅបម្លែងទៅជា JSON។

---

### 58. What is @ResponseStatus?

#### 🇺🇸 English

@ResponseStatus specifies the HTTP status code that should be returned when a particular controller method or exception is processed.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@ResponseStatus ប្រើសម្រាប់កំណត់ HTTP Status Code ដែលត្រូវ Return នៅពេល Controller Method ឬ Exception ជាក់លាក់មួយត្រូវបានដំណើរការ។

---

### 59. What is @Value?

#### 🇺🇸 English

@Value injects values from application configuration files, environment variables, or other supported property sources into Spring-managed objects.

**Example:**
`java
@Value("${server.port}")
private int port;
`

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@Value ប្រើសម្រាប់យកតម្លៃពី Configuration Files, Environment Variables ឬប្រភព Properties ផ្សេងៗ មកដាក់ក្នុង Objects ដែល Spring គ្រប់គ្រង។

---

### 60. What is @ConfigurationProperties?

#### 🇺🇸 English

@ConfigurationProperties binds a group of external configuration properties to a Java class. It is useful for managing multiple related configuration values in an organized way.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@ConfigurationProperties ប្រើសម្រាប់ភ្ជាប់ Configuration Properties ជាក្រុមទៅក្នុង Java Class មួយ។ វាមានប្រយោជន៍សម្រាប់គ្រប់គ្រង Configuration Values ដែលទាក់ទងគ្នាឱ្យមានរបៀបរៀបរយ។

---

### 61. What is @Profile?

#### 🇺🇸 English

@Profile tells Spring to register a Bean or configuration only when a specific application profile is active, such as development, testing, or production.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@Profile ប្រាប់ Spring ឱ្យចុះបញ្ជី Bean ឬ Configuration តែនៅពេល Application Profile ជាក់លាក់មួយកំពុងដំណើរការ ដូចជា Development, Testing ឬ Production។

---

### 62. What is @Lazy?

#### 🇺🇸 English

@Lazy tells Spring to initialize a Bean only when it is first requested instead of creating it during application startup.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@Lazy ប្រាប់ Spring ឱ្យចាប់ផ្តើមបង្កើត Bean នៅពេលមានការស្នើសុំប្រើវាលើកដំបូង ជំនួសឱ្យការបង្កើតវានៅពេល Application ចាប់ផ្តើម។

---

### 63. What is @Scope?

#### 🇺🇸 English

@Scope defines the lifecycle and scope of a Spring Bean. Common scopes include Singleton, Prototype, Request, and Session.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@Scope ប្រើសម្រាប់កំណត់ Lifecycle និង Scope របស់ Spring Bean។ Scopes ដែលប្រើជាទូទៅរួមមាន Singleton, Prototype, Request និង Session។

---

## 4. Spring Boot Project Structure and Configuration

### 64. What is the standard Spring Boot project structure?

#### 🇺🇸 English

A standard Spring Boot project is commonly organized into packages such as Controller, Service, Repository, Entity, DTO, Config, and Exception. This structure separates responsibilities and makes the application easier to maintain.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Spring Boot Project ជាទូទៅរៀបចំជា Packages ដូចជា Controller, Service, Repository, Entity, DTO, Config និង Exception។ រចនាសម្ព័ន្ធនេះជួយបែងចែកការទទួលខុសត្រូវ និងធ្វើឱ្យ Application ងាយស្រួលថែទាំ។

---

### 65. What is the purpose of the Controller package?

#### 🇺🇸 English

The Controller package handles incoming HTTP requests, receives client data, calls the appropriate Service methods, and returns HTTP responses.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Controller Package មានតួនាទីគ្រប់គ្រង HTTP Requests ដែលចូលមក ទទួលទិន្នន័យពី Client ហៅ Service Methods ដែលត្រូវការ និង Return HTTP Responses ទៅ Client។

---

### 66. What is the purpose of the Service package?

#### 🇺🇸 English

The Service package contains business logic. It processes application operations and coordinates communication between Controllers and Repositories.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Service Package ផ្ទុក Business Logic។ វាដំណើរការមុខងារផ្សេងៗរបស់ Application និងសម្របសម្រួលការទំនាក់ទំនងរវាង Controller និង Repository។

---

### 67. What is the purpose of the Repository package?

#### 🇺🇸 English

The Repository package handles data access operations. It communicates with the database to perform operations such as saving, retrieving, updating, and deleting data.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Repository Package គ្រប់គ្រងប្រតិបត្តិការចូលប្រើទិន្នន័យ។ វាទំនាក់ទំនងជាមួយ Database ដើម្បីរក្សាទុក ទាញយក ធ្វើបច្ចុប្បន្នភាព និងលុបទិន្នន័យ។

---

### 68. What is the purpose of the Entity package?

#### 🇺🇸 English

The Entity package contains Java classes that represent database entities. These classes map Java objects to database tables using JPA annotations.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Entity Package ផ្ទុក Java Classes ដែលតំណាងឱ្យ Database Entities។ Classes ទាំងនេះភ្ជាប់ Java Objects ទៅនឹង Database Tables ដោយប្រើ JPA Annotations។

---

### 69. What is the purpose of the DTO package?

#### 🇺🇸 English

The DTO package contains Data Transfer Objects. They define the data structure used to transfer information between the client and the backend without exposing internal database entities directly.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

DTO Package ផ្ទុក Data Transfer Objects។ វាកំណត់រចនាសម្ព័ន្ធទិន្នន័យសម្រាប់ផ្ទេរព័ត៌មានរវាង Client និង Backend ដោយមិនចាំបាច់បង្ហាញ Database Entities ខាងក្នុងដោយផ្ទាល់។

---

### 70. What is application.properties?

#### 🇺🇸 English

application.properties is a configuration file used to define application settings, such as server port, database connection, logging, and other environment properties.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

application.properties គឺជា Configuration File ដែលប្រើសម្រាប់កំណត់ Settings របស់ Application ដូចជា Server Port, Database Connection, Logging និង Environment Properties ផ្សេងៗ។

**ឧទាហរណ៍ (Example):**
`properties
server.port=8085
spring.datasource.url=jdbc:postgresql://localhost:5432/lifesync
spring.datasource.username=postgres
`

---

### 71. What is the difference between application.properties and application.yml?

#### 🇺🇸 English

Both files are used to configure Spring Boot applications. application.properties uses key-value pairs, while application.yml uses YAML's hierarchical structure. They provide similar configuration capabilities.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

File ទាំងពីរនេះប្រើសម្រាប់កំណត់ Configuration របស់ Spring Boot Application។ application.properties ប្រើទម្រង់ Key-Value Pairs ខណៈ application.yml ប្រើរចនាសម្ព័ន្ធ Hierarchical របស់ YAML។ ពួកវាមានសមត្ថភាព Configuration ស្រដៀងគ្នា។

---

### 72. What is pom.xml?

#### 🇺🇸 English

pom.xml stands for Project Object Model. It is the main Maven configuration file used to manage project dependencies, plugins, build settings, and project information.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

pom.xml មានន័យថា Project Object Model។ វាជា Maven Configuration File សំខាន់ដែលប្រើសម្រាប់គ្រប់គ្រង Dependencies, Plugins, Build Settings និងព័ត៌មានរបស់ Project។

---

### 73. What is a Spring Boot Starter dependency?

#### 🇺🇸 English

A Spring Boot Starter dependency is a predefined group of related dependencies that simplifies adding functionality to an application. Instead of adding many individual libraries, we can add one starter.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Spring Boot Starter Dependency គឺជាក្រុម Dependencies ដែលត្រូវបានរៀបចំទុកជាមុន ដើម្បីសម្រួលការបន្ថែមមុខងារទៅក្នុង Application។ ជំនួសឱ្យការបន្ថែម Libraries ច្រើនដោយឡែក យើងអាចបន្ថែម Starter មួយបាន។

---

### 74. What is the difference between Maven and Gradle?

#### 🇺🇸 English

Maven and Gradle are build automation tools. Maven mainly uses XML configuration in pom.xml, while Gradle uses Groovy or Kotlin DSL. Both manage dependencies, compile code, run tests, and package applications.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Maven និង Gradle គឺជា Build Automation Tools។ Maven ប្រើ XML Configuration នៅក្នុង pom.xml ខណៈ Gradle ប្រើ Groovy ឬ Kotlin DSL។ ទាំងពីរអាចគ្រប់គ្រង Dependencies Compile Code ដំណើរការ Tests និង Package Applications។

---

### 75. What is the purpose of spring-boot-starter-web?

#### 🇺🇸 English

spring-boot-starter-web provides the dependencies needed to build web applications and REST APIs using Spring MVC. It normally includes an embedded Tomcat server and JSON support.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

spring-boot-starter-web ផ្តល់ Dependencies ដែលត្រូវការសម្រាប់បង្កើត Web Applications និង REST APIs ដោយប្រើ Spring MVC។ ជាទូទៅវារួមមាន Embedded Tomcat Server និង JSON Support។

---

### 76. What is the purpose of spring-boot-starter-data-jpa?

#### 🇺🇸 English

spring-boot-starter-data-jpa provides the dependencies needed to work with relational databases using Spring Data JPA and JPA implementations such as Hibernate.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

spring-boot-starter-data-jpa ផ្តល់ Dependencies ដែលត្រូវការសម្រាប់ធ្វើការជាមួយ Relational Databases ដោយប្រើ Spring Data JPA និង JPA Implementation ដូចជា Hibernate។

---

### 77. What is the purpose of spring-boot-starter-security?

#### 🇺🇸 English

spring-boot-starter-security adds Spring Security to an application. It provides authentication, authorization, password encoding, and request security features.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

spring-boot-starter-security បន្ថែម Spring Security ទៅក្នុង Application។ វាផ្តល់មុខងារ Authentication, Authorization, Password Encoding និងការការពារ Requests។

---

### 78. What is the purpose of spring-boot-devtools?

#### 🇺🇸 English

spring-boot-devtools provides development-time features such as automatic application restart when classpath files change. It helps developers work more efficiently during development.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

spring-boot-devtools ផ្តល់មុខងារសម្រាប់ពេលអភិវឌ្ឍកម្មវិធី ដូចជា Restart Application ដោយស្វ័យប្រវត្តិនៅពេល Files ក្នុង Classpath មានការផ្លាស់ប្តូរ។ វាជួយឱ្យ Developer ធ្វើការបានមានប្រសិទ្ធភាពជាងមុន។

---

### 79. What are Spring profiles?

#### 🇺🇸 English

Spring profiles allow us to define different configurations for different environments, such as development, testing, and production. We can activate a profile to load the appropriate configuration.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Spring Profiles អនុញ្ញាតឱ្យយើងកំណត់ Configuration ផ្សេងៗសម្រាប់ Environments ផ្សេងគ្នា ដូចជា Development, Testing និង Production។ យើងអាច Activate Profile ដើម្បី Load Configuration ដែលត្រូវការ។

---

### 80. How do you configure development and production environments?

#### 🇺🇸 English

We can create separate configuration files, such as application-dev.properties and application-prod.properties, then activate the required profile using spring.profiles.active. Sensitive information should be supplied through environment variables or secret management systems.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

យើងអាចបង្កើត Configuration Files ដាច់ដោយឡែក ដូចជា application-dev.properties និង application-prod.properties ហើយ Activate Profile ដែលត្រូវការដោយប្រើ spring.profiles.active។ ព័ត៌មានសម្ងាត់គួរផ្តល់តាមរយៈ Environment Variables ឬ Secret Management Systems។

---

## 5. Spring MVC and REST API

### 81. What is Spring MVC?

#### 🇺🇸 English

Spring MVC is a web framework within the Spring Framework. It follows the Model-View-Controller pattern and handles HTTP requests and responses. It is commonly used to build web applications and REST APIs.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Spring MVC គឺជា Web Framework មួយនៅក្នុង Spring Framework។ វាអនុវត្តតាម Model-View-Controller Pattern ហើយគ្រប់គ្រង HTTP Requests និង Responses។ វាត្រូវបានប្រើជាទូទៅសម្រាប់បង្កើត Web Applications និង REST APIs។

---

### 82. What is MVC architecture?

#### 🇺🇸 English

MVC stands for Model-View-Controller. It separates an application into three main parts:
- Model: Manages application data.
- View: Displays information to users.
- Controller: Handles user requests and coordinates the application.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

MVC មានន័យថា Model-View-Controller។ វាបែងចែក Application ជាបីផ្នែកសំខាន់ៗ៖
- Model: គ្រប់គ្រងទិន្នន័យរបស់ Application។
- View: បង្ហាញព័ត៌មានទៅអ្នកប្រើប្រាស់។
- Controller: គ្រប់គ្រង Requests និងសម្របសម្រួលដំណើរការរបស់ Application។

---

### 83. What is DispatcherServlet?

#### 🇺🇸 English

DispatcherServlet is the front controller in Spring MVC. It receives incoming HTTP requests and dispatches them to the appropriate controller based on the configured request mappings.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

DispatcherServlet គឺជា Front Controller នៅក្នុង Spring MVC។ វាទទួល HTTP Requests ដែលចូលមក ហើយបញ្ជូន Requests ទាំងនោះទៅកាន់ Controller ដែលត្រឹមត្រូវ ដោយផ្អែកលើ Request Mappings ដែលបានកំណត់។

---

### 84. How does a request flow through a Spring Boot application?

#### 🇺🇸 English

A typical request flow is:
1. The client sends an HTTP request.
2. The request passes through security filters, if configured.
3. DispatcherServlet receives the request.
4. The Controller handles the request.
5. The Controller calls the Service.
6. The Service calls the Repository.
7. The Repository communicates with the database.
8. The result returns to the Controller.
9. Spring converts the response into JSON and sends it to the client.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

ដំណើរការ Request ជាទូទៅមានដូចខាងក្រោម៖
1. Client ផ្ញើ HTTP Request។
2. Request ឆ្លងកាត់ Security Filters ប្រសិនបើមានការកំណត់។
3. DispatcherServlet ទទួល Request។
4. Controller គ្រប់គ្រង Request។
5. Controller ហៅ Service។
6. Service ហៅ Repository។
7. Repository ទំនាក់ទំនងជាមួយ Database។
8. លទ្ធផលត្រឡប់មក Controller វិញ។
9. Spring បម្លែង Response ទៅជា JSON ហើយផ្ញើទៅ Client។

---

### 85. What is REST API?

#### 🇺🇸 English

REST stands for Representational State Transfer. A REST API is an interface that allows different applications to communicate over HTTP using methods such as GET, POST, PUT, PATCH, and DELETE.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

REST មានន័យថា Representational State Transfer។ REST API គឺជា Interface ដែលអនុញ្ញាតឱ្យ Applications ផ្សេងៗទំនាក់ទំនងគ្នាតាមរយៈ HTTP ដោយប្រើ Methods ដូចជា GET, POST, PUT, PATCH និង DELETE។

---

### 86. What is ResponseEntity?

#### 🇺🇸 English

ResponseEntity is a Spring class that represents the complete HTTP response. It allows us to control the response body, HTTP status code, and headers.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

ResponseEntity គឺជា Class របស់ Spring ដែលតំណាងឱ្យ HTTP Response ទាំងមូល។ វាអនុញ្ញាតឱ្យយើងគ្រប់គ្រង Response Body, HTTP Status Code និង Headers។

**ឧទាហរណ៍ (Example):**
`properties
return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(student);
`

---

### 87. What is the difference between @RequestParam and @PathVariable?

#### 🇺🇸 English

@PathVariable extracts values from the URL path, while @RequestParam extracts query parameters from the URL.

**Example:**
`properties
- PathVariable: /students/5
- RequestParam: /students?id=5
`

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@PathVariable ប្រើសម្រាប់យកតម្លៃពី URL Path ខណៈ @RequestParam ប្រើសម្រាប់យក Query Parameters ពី URL។

ឧទាហរណ៍៖
- PathVariable: /students/5
- RequestParam: /students?id=5

---

### 88. What is the difference between GET and POST?

#### 🇺🇸 English

GET is used to retrieve data from the server, while POST is commonly used to submit data or create new resources. GET requests should not modify server state, while POST requests can.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

GET ប្រើសម្រាប់ទាញយកទិន្នន័យពី Server ខណៈ POST ប្រើជាទូទៅសម្រាប់ផ្ញើទិន្នន័យ ឬបង្កើត Resources ថ្មី។ GET មិនគួរផ្លាស់ប្តូរ State របស់ Server ទេ ខណៈ POST អាចផ្លាស់ប្តូរបាន។

---

### 89. What is the difference between PUT and PATCH?

#### 🇺🇸 English

PUT is generally used to replace a resource with a complete representation, while PATCH is used to update specific fields of an existing resource.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

PUT ប្រើជាទូទៅសម្រាប់ជំនួស Resource ដោយទិន្នន័យថ្មីទាំងមូល ខណៈ PATCH ប្រើសម្រាប់ធ្វើបច្ចុប្បន្នភាពតែ Fields ជាក់លាក់មួយចំនួនរបស់ Resource ដែលមានស្រាប់។

---

### 90. What is the difference between @RequestBody and @ResponseBody?

#### 🇺🇸 English

@RequestBody converts incoming request data, usually JSON, into a Java object. @ResponseBody converts a returned Java object into response data, usually JSON.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@RequestBody បម្លែងទិន្នន័យដែលទទួលពី Request ជាទូទៅជា JSON ទៅជា Java Object។ ចំណែក @ResponseBody បម្លែង Java Object ដែលបាន Return ទៅជាទិន្នន័យ Response ជាទូទៅជា JSON។

---

### 91. How do you return JSON from a Controller?

#### 🇺🇸 English

We can use @RestController and return a Java object. Spring uses an HTTP message converter, commonly Jackson, to serialize the object into JSON.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

យើងអាចប្រើ @RestController ហើយ Return Java Object។ Spring ប្រើ HTTP Message Converter ជាទូទៅគឺ Jackson ដើម្បីបម្លែង Object ទៅជា JSON។

---

### 92. How does Spring Boot convert Java objects into JSON?

#### 🇺🇸 English

Spring Boot commonly uses the Jackson library through its HTTP message converters. When a Controller returns a Java object, Jackson serializes that object into JSON automatically.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Spring Boot ប្រើ Jackson Library តាមរយៈ HTTP Message Converters។ នៅពេល Controller Return Java Object មួយ Jackson នឹងបម្លែង Object នោះទៅជា JSON ដោយស្វ័យប្រវត្តិ។

---

### 93. What is Jackson?

#### 🇺🇸 English

Jackson is a Java library used to process JSON. It can serialize Java objects into JSON and deserialize JSON into Java objects.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Jackson គឺជា Java Library ដែលប្រើសម្រាប់ដំណើរការ JSON។ វាអាចបម្លែង Java Objects ទៅជា JSON និងបម្លែង JSON ត្រឡប់ទៅជា Java Objects វិញ។

---

### 94. What is content negotiation?

#### 🇺🇸 English

Content negotiation is the process of selecting the appropriate response format based on the client's request headers, such as Accept. For example, a client may request JSON or XML.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Content Negotiation គឺជាដំណើរការជ្រើសរើសទម្រង់ Response ដែលសមស្រប ដោយផ្អែកលើ Request Headers របស់ Client ដូចជា Accept។ ឧទាហរណ៍ Client អាចស្នើសុំទិន្នន័យជា JSON ឬ XML។

---

### 95. How do you handle HTTP status codes?

#### 🇺🇸 English

We can use ResponseEntity or @ResponseStatus to return appropriate HTTP status codes. For example, 200 for success, 201 for resource creation, 400 for invalid requests, 404 for missing resources, and 500 for unexpected server errors.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

យើងអាចប្រើ ResponseEntity ឬ @ResponseStatus ដើម្បី Return HTTP Status Codes ដែលត្រឹមត្រូវ។ ឧទាហរណ៍ 200 សម្រាប់ជោគជ័យ, 201 សម្រាប់ការបង្កើត Resource, 400 សម្រាប់ Request មិនត្រឹមត្រូវ, 404 សម្រាប់ Resource មិនមាន និង 500 សម្រាប់ Server Error ដែលមិនបានរំពឹងទុក។

---

### 96. What is API versioning?

#### 🇺🇸 English

API versioning is a technique used to manage different versions of an API without breaking existing clients. For example, we can use /api/v1/students and /api/v2/students.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

API Versioning គឺជាបច្ចេកទេសសម្រាប់គ្រប់គ្រង API ជំនាន់ផ្សេងៗ ដោយមិនធ្វើឱ្យ Client ចាស់ៗដែលកំពុងប្រើប្រាស់មានបញ្ហា។ ឧទាហរណ៍ យើងអាចប្រើ /api/v1/students និង /api/v2/students។

---

### 97. How do you implement pagination in Spring Boot?

#### 🇺🇸 English

We can use Spring Data JPA's Pageable interface and Page object to retrieve data in smaller groups instead of loading all records at once.

**Example:**
`properties
Page<Student> students =
    studentRepository.findAll(
        PageRequest.of(0, 10)
    );
`

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

យើងអាចប្រើ Pageable Interface និង Page Object របស់ Spring Data JPA ដើម្បីទាញយកទិន្នន័យជាផ្នែកៗ ជំនួសឱ្យការទាញយក Records ទាំងអស់ក្នុងពេលតែមួយ។

---

### 98. How do you implement sorting?

#### 🇺🇸 English

We can use Spring Data JPA's Sort class or combine sorting with Pageable to retrieve records in ascending or descending order.

**Example:**
`properties
Sort sort = Sort.by("name").ascending();

List<Student> students =
    studentRepository.findAll(sort);
`

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

យើងអាចប្រើ Sort Class របស់ Spring Data JPA ឬប្រើវាជាមួយ Pageable ដើម្បីទាញយក Records តាមលំដាប់កើនឡើង ឬលំដាប់ថយចុះ។

---

### 99. How do you implement search functionality?

#### 🇺🇸 English

We can implement search functionality using Spring Data JPA query methods, JPQL, or the @Query annotation. For example, we can search for students by name or email.

**Example:**
`properties
List<Student> findByNameContainingIgnoreCase(
    String name
);
`

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

យើងអាចបង្កើត Search Functionality ដោយប្រើ Spring Data JPA Query Methods, JPQL ឬ @Query Annotation។ ឧទាហរណ៍ យើងអាចស្វែងរក Student តាមឈ្មោះ ឬ Email។

---

### 100. How do you handle file uploads in Spring Boot?

#### 🇺🇸 English

We can use MultipartFile to receive uploaded files from clients. Then we validate the file, check its type and size, and store it in local storage or cloud storage.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

យើងអាចប្រើ MultipartFile ដើម្បីទទួល Files ដែល Client Upload មក។ បន្ទាប់មកយើងត្រូវ Validate File ពិនិត្យប្រភេទ និងទំហំរបស់វា ហើយរក្សាទុកនៅក្នុង Local Storage ឬ Cloud Storage។

---

## 6. DTO and Layered Architecture

### 101. What is layered architecture?

#### 🇺🇸 English

Layered architecture is a software design pattern that separates an application into different layers based on their responsibilities. In Spring Boot, common layers include Controller, Service, and Repository.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Layered Architecture គឺជា Software Design Pattern ដែលបែងចែក Application ទៅជា Layers ផ្សេងៗ ដោយផ្អែកលើការទទួលខុសត្រូវរបស់វា។ នៅក្នុង Spring Boot Layers ដែលប្រើជាទូទៅរួមមាន Controller, Service និង Repository។

---

### 102. What are the responsibilities of Controller, Service, and Repository?

#### 🇺🇸 English

- Controller: Handles HTTP requests and responses.
- Service: Contains business logic.
- Repository: Handles database operations.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

- Controller: គ្រប់គ្រង HTTP Requests និង Responses។
- Service: ផ្ទុក Business Logic។
- Repository: គ្រប់គ្រងប្រតិបត្តិការជាមួយ Database។

---

### 103. Why do we separate business logic from Controller?

#### 🇺🇸 English

We separate business logic from Controllers to improve code organization, maintainability, reusability, and testability. Controllers should mainly handle requests and responses, while Services handle business operations.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

យើងបែងចែក Business Logic ចេញពី Controller ដើម្បីធ្វើឱ្យ Code មានរបៀបរៀបរយ ងាយស្រួលថែទាំ ប្រើឡើងវិញ និង Test។ Controller គួរផ្តោតលើការគ្រប់គ្រង Requests និង Responses ខណៈ Service គ្រប់គ្រង Business Operations។

---

### 104. What is DTO?

#### 🇺🇸 English

DTO stands for Data Transfer Object. It is an object used to transfer data between different parts of an application or between the client and the backend.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

DTO មានន័យថា Data Transfer Object។ វាជា Object ដែលប្រើសម្រាប់ផ្ទេរទិន្នន័យរវាងផ្នែកផ្សេងៗនៃ Application ឬរវាង Client និង Backend។

---

### 105. What does DTO stand for?

#### 🇺🇸 English

DTO stands for Data Transfer Object.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

DTO គឺជាពាក្យកាត់របស់ Data Transfer Object ដែលមានន័យថា Object សម្រាប់ផ្ទេរទិន្នន័យ។

---

### 106. Why do we use DTO?

#### 🇺🇸 English

We use DTOs to control what data enters and leaves our application, avoid exposing internal Entity structures, improve security, and separate API data structures from database models.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

យើងប្រើ DTO ដើម្បីគ្រប់គ្រងទិន្នន័យដែលចូល និងចេញពី Application ជៀសវាងការបង្ហាញ Entity Structure ខាងក្នុង បង្កើនសុវត្ថិភាព និងបែងចែក API Data Structure ចេញពី Database Models។

---

### 107. What is the difference between DTO and Entity?

#### 🇺🇸 English

An Entity represents a database table and is managed by JPA. A DTO is used to transfer data between the client and application. An Entity focuses on database persistence, while a DTO focuses on data communication.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Entity តំណាងឱ្យ Database Table ហើយត្រូវបានគ្រប់គ្រងដោយ JPA។ ចំណែក DTO ប្រើសម្រាប់ផ្ទេរទិន្នន័យរវាង Client និង Application។ Entity ផ្តោតលើការរក្សាទុកទិន្នន័យក្នុង Database ខណៈ DTO ផ្តោតលើការទំនាក់ទំនងទិន្នន័យ។

---

### 108. What is the difference between Request DTO and Response DTO?

#### 🇺🇸 English

A Request DTO defines the data that the client sends to the backend. A Response DTO defines the data that the backend returns to the client.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Request DTO កំណត់ទិន្នន័យដែល Client ផ្ញើមក Backend។ ចំណែក Response DTO កំណត់ទិន្នន័យដែល Backend Return ទៅ Client វិញ។

---

### 109. What is a Mapper?

#### 🇺🇸 English

A Mapper is a component or utility responsible for converting data from one object type to another, such as converting an Entity into a DTO or a DTO into an Entity.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Mapper គឺជា Component ឬ Utility ដែលមានតួនាទីបម្លែងទិន្នន័យពី Object Type មួយទៅ Object Type មួយទៀត ដូចជាបម្លែង Entity ទៅជា DTO ឬ DTO ទៅជា Entity។

---

### 110. What is MapStruct?

#### 🇺🇸 English

MapStruct is a Java annotation processor that generates mapping code at compile time. It helps convert between DTOs and Entities without writing repetitive mapping code manually.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

MapStruct គឺជា Java Annotation Processor ដែលបង្កើត Mapping Code នៅពេល Compile។ វាជួយបម្លែងរវាង DTOs និង Entities ដោយមិនចាំបាច់សរសេរ Mapping Code ដដែលៗដោយដៃ។

---

### 111. Why shouldn't we expose Entity objects directly to clients?

#### 🇺🇸 English

We should avoid exposing Entities directly because they may contain sensitive fields, internal database structures, and relationships that cause unwanted data exposure or serialization problems. DTOs give us better control over API responses.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

យើងគួរជៀសវាងការបង្ហាញ Entities ដោយផ្ទាល់ ព្រោះវាអាចមាន Sensitive Fields, Database Structures ខាងក្នុង និង Relationships ដែលអាចបណ្តាលឱ្យបង្ហាញទិន្នន័យដែលមិនចង់បាន ឬបង្កបញ្ហា Serialization។ DTOs ជួយឱ្យយើងគ្រប់គ្រង API Responses បានល្អជាងមុន។

---

### 112. How does data flow from Controller to Repository?

#### 🇺🇸 English

The Controller receives the request and passes the required data to the Service. The Service processes the business logic and calls the Repository to perform database operations. The result then returns through the Service to the Controller.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Controller ទទួល Request ហើយបញ្ជូនទិន្នន័យដែលត្រូវការទៅ Service។ Service ដំណើរការ Business Logic ហើយហៅ Repository ដើម្បីធ្វើប្រតិបត្តិការ Database។ បន្ទាប់មកលទ្ធផលត្រឡប់តាម Service មក Controller វិញ។

---

### 113. Can a Controller communicate directly with a Repository?

#### 🇺🇸 English

Yes, it is technically possible, but it is generally not recommended in a layered architecture. Controllers should communicate with Services so that business logic remains separate and reusable.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

បាន វាអាចធ្វើទៅបានតាមបច្ចេកទេស ប៉ុន្តែជាទូទៅមិនត្រូវបានណែនាំក្នុង Layered Architecture ទេ។ Controller គួរទំនាក់ទំនងជាមួយ Service ដើម្បីឱ្យ Business Logic ត្រូវបានបែងចែកដាច់ដោយឡែក និងអាចប្រើឡើងវិញបាន។

---

### 114. What is the best way to organize a Spring Boot project?

#### 🇺🇸 English

A good approach is to organize the project by feature or by layer, depending on its size and complexity. For a layered project, we can separate Controller, Service, Repository, Entity, DTO, Mapper, Configuration, and Exception packages.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

វិធីល្អមួយគឺរៀបចំ Project តាម Feature ឬតាម Layer ដោយផ្អែកលើទំហំ និងភាពស្មុគស្មាញរបស់វា។ សម្រាប់ Layered Project យើងអាចបែងចែកជា Controller, Service, Repository, Entity, DTO, Mapper, Configuration និង Exception Packages។

---

## 7. Spring Data JPA and Hibernate Integration

### 115. What is Spring Data JPA?

#### 🇺🇸 English

Spring Data JPA is a Spring module that simplifies database operations. It provides repository interfaces and built-in methods such as save(), findById(), findAll(), and deleteById() so developers don't need to write common SQL queries manually.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Spring Data JPA គឺជា Module របស់ Spring ដែលជួយសម្រួលការធ្វើប្រតិបត្តិការជាមួយ Database។ វាផ្តល់ Repository Interfaces និង Methods ដែលមានស្រាប់ ដូចជា save(), findById(), findAll() និង deleteById() ដើម្បីកុំឱ្យ Developer ចាំបាច់សរសេរ SQL Queries ទូទៅដោយដៃ។

---

### 116. What is JPA?

#### 🇺🇸 English

JPA stands for Java Persistence API, now known as Jakarta Persistence. It is a specification that defines how Java applications map objects to relational databases and manage persistent data.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

JPA មានន័យថា Java Persistence API ដែលបច្ចុប្បន្នត្រូវបានស្គាល់ថា Jakarta Persistence។ វាជា Specification ដែលកំណត់ពីរបៀបភ្ជាប់ Java Objects ទៅ Relational Databases និងគ្រប់គ្រងទិន្នន័យដែលត្រូវរក្សាទុក។

---

### 117. What is Hibernate?

#### 🇺🇸 English

Hibernate is an ORM framework and an implementation of the JPA specification. It helps developers map Java objects to database tables and perform database operations without writing SQL for every operation.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Hibernate គឺជា ORM Framework និងជា Implementation មួយរបស់ JPA Specification។ វាជួយ Developer ភ្ជាប់ Java Objects ទៅ Database Tables និងធ្វើប្រតិបត្តិការ Database ដោយមិនចាំបាច់សរសេរ SQL សម្រាប់គ្រប់ប្រតិបត្តិការទាំងអស់។

---

### 118. What is the difference between JPA and Hibernate?

#### 🇺🇸 English

JPA is a specification that defines standards for persistence in Java applications, while Hibernate is a framework that implements those standards and provides additional features.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

JPA គឺជា Specification ដែលកំណត់ស្តង់ដារសម្រាប់ការរក្សាទុកទិន្នន័យក្នុង Java Applications។ ចំណែក Hibernate គឺជា Framework ដែលអនុវត្តតាមស្តង់ដារទាំងនោះ និងផ្តល់មុខងារបន្ថែម។

---

### 119. What is ORM?

#### 🇺🇸 English

ORM stands for Object-Relational Mapping. It is a technique that maps Java objects and classes to relational database tables, allowing developers to work with database records using objects.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

ORM មានន័យថា Object-Relational Mapping។ វាជាបច្ចេកទេសដែលភ្ជាប់ Java Objects និង Classes ទៅនឹង Relational Database Tables ដោយអនុញ្ញាតឱ្យ Developer ធ្វើការជាមួយ Database Records តាមរយៈ Objects។

---

### 120. What is an Entity?

#### 🇺🇸 English

An Entity is a Java class that represents a database table. Each instance of the class represents a record in that table.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Entity គឺជា Java Class ដែលតំណាងឱ្យ Database Table មួយ។ Object នីមួយៗដែលបង្កើតពី Class នោះតំណាងឱ្យ Record មួយនៅក្នុង Table នោះ។

---

### 121. What is @Entity?

#### 🇺🇸 English

@Entity is a JPA annotation that marks a Java class as an entity that should be mapped to a database table.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@Entity គឺជា JPA Annotation ដែលសម្គាល់ Java Class មួយថាជា Entity ដែលត្រូវភ្ជាប់ទៅនឹង Database Table។

---

### 122. What is @Table?

#### 🇺🇸 English

@Table is a JPA annotation used to specify the database table name and other table-level settings for an Entity.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@Table គឺជា JPA Annotation ដែលប្រើសម្រាប់កំណត់ឈ្មោះ Database Table និង Settings ផ្សេងៗរបស់ Table សម្រាប់ Entity មួយ។

---

### 123. What is @Id?

#### 🇺🇸 English

@Id marks a field as the primary key of an Entity. It uniquely identifies each record in the corresponding database table.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@Id សម្គាល់ Field មួយថាជា Primary Key របស់ Entity។ វាប្រើសម្រាប់កំណត់អត្តសញ្ញាណ Record នីមួយៗនៅក្នុង Database Table ឱ្យមានភាពខុសគ្នា។

---

### 124. What is @GeneratedValue?

#### 🇺🇸 English

@GeneratedValue tells JPA how the primary key value should be generated automatically. Common strategies include IDENTITY, SEQUENCE, and AUTO.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@GeneratedValue ប្រាប់ JPA ពីរបៀបបង្កើត Primary Key ដោយស្វ័យប្រវត្តិ។ Strategies ដែលប្រើជាទូទៅរួមមាន IDENTITY, SEQUENCE និង AUTO។

**ឧទាហរណ៍ (Example):**
`java
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
`

---

### 125. What is JpaRepository?

#### 🇺🇸 English

JpaRepository is an interface provided by Spring Data JPA. It provides built-in methods for CRUD operations, pagination, sorting, and JPA-specific database operations.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

JpaRepository គឺជា Interface ដែលផ្តល់ដោយ Spring Data JPA។ វាផ្តល់ Methods ដែលមានស្រាប់សម្រាប់ CRUD Operations, Pagination, Sorting និង Database Operations ផ្សេងៗដែលទាក់ទងនឹង JPA។

---

### 126. What is the difference between CrudRepository and JpaRepository?

#### 🇺🇸 English

CrudRepository provides basic CRUD operations. JpaRepository extends additional Spring Data repository functionality and provides JPA-specific operations, including flushing and batch-oriented methods. It also supports pagination and sorting through its repository inheritance.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

CrudRepository ផ្តល់ CRUD Operations មូលដ្ឋាន។ ចំណែក JpaRepository ពង្រីកមុខងារ Repository បន្ថែម និងផ្តល់ Operations ជាក់លាក់របស់ JPA ដូចជា Flushing និង Batch Operations។ វាក៏គាំទ្រ Pagination និង Sorting តាមរយៈ Repository ដែលវា Inherit ផងដែរ។

---

### 127. What is @Query?

#### 🇺🇸 English

@Query is an annotation used to define custom database queries directly inside a Spring Data Repository method. It supports JPQL and native SQL queries.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@Query គឺជា Annotation ដែលប្រើសម្រាប់កំណត់ Custom Database Queries ដោយផ្ទាល់នៅក្នុង Repository Method។ វាគាំទ្រ JPQL និង Native SQL Queries។

**ឧទាហរណ៍ (Example):**
`java
@Query("SELECT s FROM Student s WHERE s.name = :name")
List<Student> findStudentsByName(
    @Param("name") String name
);
`

---

### 128. What is JPQL?

#### 🇺🇸 English

JPQL stands for Java Persistence Query Language. It is a query language used to retrieve and manipulate data based on Entity classes and their fields rather than directly referencing database tables and columns.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

JPQL មានន័យថា Java Persistence Query Language។ វាជា Query Language ដែលប្រើសម្រាប់ទាញយក និងគ្រប់គ្រងទិន្នន័យដោយផ្អែកលើ Entity Classes និង Fields របស់វា ជំនួសឱ្យការយោងទៅ Database Tables និង Columns ដោយផ្ទាល់។

---

### 129. What is the difference between JPQL and native SQL?

#### 🇺🇸 English

JPQL works with Entity classes and their properties, while native SQL works directly with database tables and columns. JPQL is more database-independent, whereas native SQL allows database-specific queries.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

JPQL ធ្វើការជាមួយ Entity Classes និង Properties របស់វា ខណៈ Native SQL ធ្វើការដោយផ្ទាល់ជាមួយ Database Tables និង Columns។ JPQL មិនសូវពឹងផ្អែកលើ Database ជាក់លាក់ទេ ខណៈ Native SQL អាចប្រើ Queries ដែលជាក់លាក់សម្រាប់ Database មួយ។

---

### 130. What is @Modifying?

#### 🇺🇸 English

@Modifying tells Spring Data JPA that a custom query performs a modifying operation, such as UPDATE or DELETE, rather than a SELECT query. It is commonly used together with @Query and a transaction.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@Modifying ប្រាប់ Spring Data JPA ថា Custom Query មួយធ្វើប្រតិបត្តិការផ្លាស់ប្តូរទិន្នន័យ ដូចជា UPDATE ឬ DELETE ជំនួសឱ្យ SELECT Query។ វាត្រូវបានប្រើជាទូទៅជាមួយ @Query និង Transaction។

---

### 131. What is @Transactional?

#### 🇺🇸 English

@Transactional is an annotation used to manage database transactions. It ensures that a group of database operations is executed within a transaction, allowing them to be committed together or rolled back when an applicable failure occurs.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@Transactional គឺជា Annotation ដែលប្រើសម្រាប់គ្រប់គ្រង Database Transactions។ វាធានាថា Database Operations មួយក្រុមដំណើរការនៅក្នុង Transaction តែមួយ ដោយអាច Commit ជាមួយគ្នា ឬ Rollback នៅពេលមានកំហុសដែលត្រូវអនុវត្ត Rollback។

---

### 132. What is lazy loading?

#### 🇺🇸 English

Lazy loading means related data is not loaded immediately when the main Entity is retrieved. It is loaded only when the application accesses that relationship.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Lazy Loading មានន័យថា Related Data មិនត្រូវបានទាញយកភ្លាមៗនៅពេល Retrieve Entity ចម្បងទេ។ វានឹងត្រូវបានទាញយកនៅពេល Application ចូលប្រើ Relationship នោះ។

---

### 133. What is eager loading?

#### 🇺🇸 English

Eager loading means related data is loaded immediately together with the main Entity, even if the application does not access that relationship afterward.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Eager Loading មានន័យថា Related Data ត្រូវបានទាញយកភ្លាមៗជាមួយ Entity ចម្បង ទោះបីជា Application មិនបានចូលប្រើ Relationship នោះនៅពេលក្រោយក៏ដោយ។

---

### 134. What is the N+1 query problem?

#### 🇺🇸 English

The N+1 query problem occurs when an application executes one query to retrieve a list of parent entities and then executes an additional query for each parent to retrieve related data. This can cause unnecessary database queries and poor performance.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

N+1 Query Problem កើតឡើងនៅពេល Application ប្រើ Query មួយដើម្បីទាញយក Parent Entities ហើយបន្ទាប់មកប្រើ Query បន្ថែមសម្រាប់ Parent នីមួយៗ ដើម្បីទាញយក Related Data។ វាអាចបណ្តាលឱ្យមាន Database Queries ច្រើនដោយមិនចាំបាច់ និងធ្វើឱ្យ Performance ធ្លាក់ចុះ។

---

### 135. What is cascading?

#### 🇺🇸 English

Cascading in JPA means that an operation performed on one Entity can automatically be applied to its related Entities. For example, saving a parent Entity may also save its associated child Entities when the appropriate cascade type is configured.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Cascading នៅក្នុង JPA មានន័យថា Operation ដែលអនុវត្តលើ Entity មួយអាចត្រូវអនុវត្តទៅលើ Related Entities របស់វាដោយស្វ័យប្រវត្តិ។ ឧទាហរណ៍ ការរក្សាទុក Parent Entity អាចរក្សាទុក Child Entities ដែលភ្ជាប់ជាមួយវាផងដែរ ប្រសិនបើបានកំណត់ Cascade Type ត្រឹមត្រូវ។

---

### 136. What is mappedBy?

#### 🇺🇸 English

mappedBy identifies the field in the related Entity that owns the relationship. It is commonly used on the inverse side of bidirectional relationships to avoid creating an unnecessary extra relationship mapping.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

mappedBy ប្រើសម្រាប់កំណត់ Field នៅក្នុង Related Entity ដែលជាអ្នកគ្រប់គ្រង Relationship។ វាត្រូវបានប្រើជាទូទៅនៅផ្នែក Inverse Side នៃ Bidirectional Relationship ដើម្បីជៀសវាងការបង្កើត Relationship Mapping បន្ថែមដែលមិនចាំបាច់។

---

### 137. What is @JoinColumn?

#### 🇺🇸 English

@JoinColumn specifies the database column used as a foreign key to connect related entities. It is commonly used in relationships such as Many-to-One and One-to-One.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@JoinColumn ប្រើសម្រាប់កំណត់ Database Column ដែលប្រើជា Foreign Key ដើម្បីភ្ជាប់ Entities ដែលមានទំនាក់ទំនងគ្នា។ វាត្រូវបានប្រើជាទូទៅក្នុង Relationships ដូចជា Many-to-One និង One-to-One។

---

### 138. What is the difference between save() and saveAndFlush()?

#### 🇺🇸 English

save() saves an Entity through the JPA persistence context, and the actual SQL execution may happen later when the persistence context is flushed. saveAndFlush() saves the Entity and immediately requests a flush to synchronize pending changes with the database.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

save() រក្សាទុក Entity តាមរយៈ JPA Persistence Context ហើយ SQL អាចត្រូវបាន Execute នៅពេលក្រោយ នៅពេល Persistence Context ត្រូវបាន Flush។ ចំណែក saveAndFlush() រក្សាទុក Entity ហើយស្នើឱ្យ Flush ភ្លាមៗ ដើម្បី Synchronize ការផ្លាស់ប្តូរដែលរង់ចាំជាមួយ Database។

---

## 8. Validation and Exception Handling

### 139. What is validation in Spring Boot?

#### 🇺🇸 English

Validation is the process of checking whether incoming data meets defined rules before the application processes it. It helps prevent invalid data from entering the system.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Validation គឺជាដំណើរការត្រួតពិនិត្យថា ទិន្នន័យដែលទទួលបានត្រូវតាមលក្ខខណ្ឌដែលបានកំណត់មុនពេល Application ដំណើរការឬអត់។ វាជួយការពារទិន្នន័យមិនត្រឹមត្រូវមិនឱ្យចូលក្នុងប្រព័ន្ធ។

---

### 140. What is @Valid?

#### 🇺🇸 English

@Valid tells Spring to validate an object based on the validation annotations defined on its fields, such as @NotBlank, @Email, and @Size.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@Valid ប្រាប់ Spring ឱ្យ Validate Object មួយដោយផ្អែកលើ Validation Annotations ដែលបានកំណត់នៅលើ Fields របស់វា ដូចជា @NotBlank, @Email និង @Size។

---

### 141. What is @Validated?

#### 🇺🇸 English

@Validated is a Spring annotation that enables validation and also supports validation groups. It can be used at the class level for method parameter validation when the required method-validation infrastructure is configured.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@Validated គឺជា Spring Annotation ដែលបើកមុខងារ Validation ហើយគាំទ្រ Validation Groups ផងដែរ។ វាអាចប្រើនៅកម្រិត Class សម្រាប់ Validate Method Parameters នៅពេលបានកំណត់ Method-Validation Infrastructure ដែលត្រូវការ។

---

### 142. What is the difference between @Valid and @Validated?

#### 🇺🇸 English

Both annotations trigger validation. @Valid comes from Jakarta Bean Validation and supports cascading validation. @Validated is provided by Spring and additionally supports validation groups and Spring method validation.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Annotations ទាំងពីរនេះប្រើសម្រាប់ចាប់ផ្តើម Validation។ @Valid មកពី Jakarta Bean Validation ហើយគាំទ្រ Cascading Validation។ ចំណែក @Validated ផ្តល់ដោយ Spring ហើយមានមុខងារបន្ថែមដូចជា Validation Groups និង Spring Method Validation។

---

### 143. What is @NotNull?

#### 🇺🇸 English

@NotNull ensures that a field or value is not null. However, it does not prevent empty strings or strings containing only spaces.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@NotNull ធានាថា Field ឬ Value មួយមិនមែនជា Null។ ប៉ុន្តែវាមិនរារាំង Empty Strings ឬ Strings ដែលមានតែចន្លោះទទេនោះទេ។

---

### 144. What is @NotBlank?

#### 🇺🇸 English

@NotBlank ensures that a string is not null and contains at least one non-whitespace character. It is commonly used for required text fields.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@NotBlank ធានាថា String មិនមែនជា Null ហើយត្រូវមានតួអក្សរយ៉ាងហោចណាស់មួយដែលមិនមែនជា Whitespace។ វាត្រូវបានប្រើជាទូទៅសម្រាប់ Text Fields ដែលចាំបាច់ត្រូវមានតម្លៃ។

---

### 145. What is @NotEmpty?

#### 🇺🇸 English

@NotEmpty ensures that a string, collection, map, or array is not null and has at least one element or character. It does not reject a string containing only spaces.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@NotEmpty ធានាថា String, Collection, Map ឬ Array មិនមែនជា Null ហើយត្រូវមាន Element ឬ Character យ៉ាងហោចណាស់មួយ។ ប៉ុន្តែវាមិនបដិសេធ String ដែលមានតែចន្លោះទទេទេ។

---

### 146. What is the difference between NotNull, NotBlank, and NotEmpty?

#### 🇺🇸 English

- @NotNull: The value cannot be null.
- @NotEmpty: The value cannot be null or empty.
- @NotBlank: A string cannot be null, empty, or contain only whitespace.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

- @NotNull: តម្លៃមិនអាចជា Null បានទេ។
- @NotEmpty: តម្លៃមិនអាចជា Null ឬទទេបានទេ។
- @NotBlank: String មិនអាចជា Null, ទទេ ឬមានតែចន្លោះទទេបានទេ។

---

### 147. How do you create custom validation?

#### 🇺🇸 English

We create custom validation by defining a custom annotation and implementing its validation logic using a class that implements ConstraintValidator. This allows us to define validation rules that are not covered by standard annotations.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

យើងបង្កើត Custom Validation ដោយកំណត់ Custom Annotation មួយ ហើយអនុវត្ត Validation Logic តាមរយៈ Class ដែល Implements ConstraintValidator។ វាអនុញ្ញាតឱ្យយើងបង្កើត Validation Rules ដែល Standard Annotations មិនបានផ្តល់ឱ្យ។

---

### 148. What is exception handling?

#### 🇺🇸 English

Exception handling is the process of managing errors that occur during application execution. It allows us to respond to errors properly instead of letting the application fail unexpectedly.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Exception Handling គឺជាដំណើរការគ្រប់គ្រង Errors ដែលកើតឡើងនៅពេល Application ដំណើរការ។ វាអនុញ្ញាតឱ្យយើងឆ្លើយតបទៅនឹង Errors បានត្រឹមត្រូវ ជំនួសឱ្យការឱ្យ Application បរាជ័យដោយមិនបានរំពឹងទុក។

---

### 149. What is a custom exception?

#### 🇺🇸 English

A custom exception is an exception class created by developers to represent a specific application error. For example, StudentNotFoundException can represent a situation where a requested student does not exist.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Custom Exception គឺជា Exception Class ដែល Developer បង្កើតឡើងដើម្បីតំណាងឱ្យ Error ជាក់លាក់មួយរបស់ Application។ ឧទាហរណ៍ StudentNotFoundException អាចប្រើសម្រាប់ស្ថានភាពដែល Student ដែលបានស្នើសុំមិនមាននៅក្នុងប្រព័ន្ធ។

---

### 150. What is @ExceptionHandler?

#### 🇺🇸 English

@ExceptionHandler is an annotation used to handle specific exceptions inside a Controller or a global exception-handling class. It allows us to return a controlled response when an error occurs.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@ExceptionHandler គឺជា Annotation ដែលប្រើសម្រាប់គ្រប់គ្រង Exceptions ជាក់លាក់នៅក្នុង Controller ឬ Global Exception Handling Class។ វាអនុញ្ញាតឱ្យយើង Return Response ដែលបានកំណត់ នៅពេលមាន Error កើតឡើង។

---

### 151. What is @ControllerAdvice?

#### 🇺🇸 English

@ControllerAdvice is an annotation that allows us to define shared logic across multiple Controllers. It is commonly used for global exception handling, data binding, and model-related advice.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@ControllerAdvice គឺជា Annotation ដែលអនុញ្ញាតឱ្យយើងកំណត់ Logic រួមសម្រាប់ Controllers ច្រើន។ វាត្រូវបានប្រើជាទូទៅសម្រាប់ Global Exception Handling, Data Binding និង Model-related Advice។

---

### 152. What is @RestControllerAdvice?

#### 🇺🇸 English

@RestControllerAdvice is a specialized form of @ControllerAdvice that combines it with @ResponseBody. It is commonly used to handle exceptions globally in REST APIs and return responses such as JSON.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@RestControllerAdvice គឺជា Annotation ដែលមានលក្ខណៈពិសេសដោយរួមបញ្ចូល @ControllerAdvice ជាមួយ @ResponseBody។ វាត្រូវបានប្រើជាទូទៅសម្រាប់គ្រប់គ្រង Exceptions ទូទាំង REST APIs និង Return Responses ដូចជា JSON។

---

### 153. What is the difference between ControllerAdvice and RestControllerAdvice?

#### 🇺🇸 English

@ControllerAdvice is commonly used for shared MVC controller logic and can return views or response bodies. @RestControllerAdvice includes @ResponseBody, so its handler results are written directly into the HTTP response body, usually as JSON.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

@ControllerAdvice ប្រើជាទូទៅសម្រាប់ Shared MVC Controller Logic ហើយអាច Return Views ឬ Response Bodies។ ចំណែក @RestControllerAdvice មាន @ResponseBody រួចជាស្រេច ដូច្នេះលទ្ធផលពី Handler នឹងត្រូវបញ្ជូនដោយផ្ទាល់ទៅក្នុង HTTP Response Body ជាទូទៅជា JSON។

---

### 154. How do you handle exceptions globally?

#### 🇺🇸 English

I use @RestControllerAdvice with @ExceptionHandler methods to catch specific exceptions across the application. Then I return a standardized error response with an appropriate HTTP status code and error message.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

ខ្ញុំប្រើ @RestControllerAdvice ជាមួយ @ExceptionHandler Methods ដើម្បីចាប់ Exceptions ជាក់លាក់នៅទូទាំង Application។ បន្ទាប់មកខ្ញុំ Return Error Response ដែលមានទម្រង់ស្តង់ដារ ជាមួយ HTTP Status Code និង Error Message ដែលសមស្រប។

---

### 155. How do you return a standard error response?

#### 🇺🇸 English

I create a common error response DTO containing fields such as status code, error message, timestamp, and request path. Then I use global exception handling to return that DTO consistently whenever an error occurs.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

ខ្ញុំបង្កើត Common Error Response DTO ដែលមាន Fields ដូចជា Status Code, Error Message, Timestamp និង Request Path។ បន្ទាប់មកខ្ញុំប្រើ Global Exception Handling ដើម្បី Return DTO នោះឱ្យមានទម្រង់ដូចគ្នារាល់ពេលមាន Error កើតឡើង។

**ឧទាហរណ៍ (Example):**
`java
public class ErrorResponse {
    private int status;
    private String message;
    private LocalDateTime timestamp;
    private String path;
}
`

---

## 9. Spring Security and JWT

### 156. What is Spring Security?

#### 🇺🇸 English

Spring Security is a security framework for Spring applications. It provides authentication, authorization, and protection against common security attacks.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Spring Security គឺជា Security Framework សម្រាប់ Spring Applications។ វាផ្តល់មុខងារ Authentication, Authorization និងការការពារប្រឆាំងនឹង Security Attacks ទូទៅ។

---

### 157. Why do we use Spring Security?

#### 🇺🇸 English

We use Spring Security to protect application resources, authenticate users, manage permissions, and prevent unauthorized access to APIs and other application features.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

យើងប្រើ Spring Security ដើម្បីការពារ Application Resources ផ្ទៀងផ្ទាត់អត្តសញ្ញាណអ្នកប្រើប្រាស់ គ្រប់គ្រងសិទ្ធិ និងទប់ស្កាត់ការចូលប្រើ APIs ឬមុខងារផ្សេងៗដោយគ្មានការអនុញ្ញាត។

---

### 158. What is authentication?

#### 🇺🇸 English

Authentication is the process of verifying the identity of a user. For example, a user provides an email and password to prove who they are.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Authentication គឺជាដំណើរការផ្ទៀងផ្ទាត់អត្តសញ្ញាណរបស់អ្នកប្រើប្រាស់។ ឧទាហរណ៍ User បញ្ចូល Email និង Password ដើម្បីបញ្ជាក់ថាគាត់ជានរណា។

---

### 159. What is authorization?

#### 🇺🇸 English

Authorization is the process of determining what an authenticated user is allowed to access or perform. For example, an administrator may have permission to delete users, while a normal user does not.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Authorization គឺជាដំណើរការកំណត់ថា User ដែលបានផ្ទៀងផ្ទាត់អត្តសញ្ញាណរួចហើយ មានសិទ្ធិចូលប្រើ ឬអនុវត្តអ្វីខ្លះ។ ឧទាហរណ៍ Admin អាចមានសិទ្ធិលុប Users ខណៈ Normal User មិនមានសិទ្ធិនោះទេ។

---

### 160. What is the difference between authentication and authorization?

#### 🇺🇸 English

Authentication verifies who the user is, while authorization determines what the user is allowed to do.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Authentication គឺជាការផ្ទៀងផ្ទាត់ថា User ជានរណា។ ចំណែក Authorization គឺជាការកំណត់ថា User មានសិទ្ធិធ្វើអ្វីខ្លះ។

---

### 161. What is SecurityFilterChain?

#### 🇺🇸 English

SecurityFilterChain is a Spring Security component that defines the security filters applied to incoming HTTP requests. It allows us to configure authentication, authorization, CSRF, CORS, and other security rules.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

SecurityFilterChain គឺជា Component របស់ Spring Security ដែលកំណត់ Security Filters សម្រាប់ HTTP Requests ដែលចូលមក។ វាអនុញ្ញាតឱ្យយើងកំណត់ Authentication, Authorization, CSRF, CORS និង Security Rules ផ្សេងៗ។

---

### 162. What is a security filter?

#### 🇺🇸 English

A security filter is a component that intercepts HTTP requests before they reach the Controller. It can perform tasks such as checking authentication tokens, validating users, and enforcing security rules.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Security Filter គឺជា Component ដែលស្ទាក់ចាប់ HTTP Requests មុនពេលវាទៅដល់ Controller។ វាអាចធ្វើការដូចជា ពិនិត្យ Authentication Tokens, ផ្ទៀងផ្ទាត់ Users និងអនុវត្ត Security Rules។

---

### 163. What is UserDetails?

#### 🇺🇸 English

UserDetails is a Spring Security interface that represents the user's authentication information, including username, password, and authorities or permissions.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

UserDetails គឺជា Interface របស់ Spring Security ដែលតំណាងឱ្យព័ត៌មាន Authentication របស់ User រួមមាន Username, Password និង Authorities ឬ Permissions។

---

### 164. What is UserDetailsService?

#### 🇺🇸 English

UserDetailsService is an interface used by Spring Security to load user information by username during authentication. Developers commonly implement it to retrieve users from a database.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

UserDetailsService គឺជា Interface ដែល Spring Security ប្រើសម្រាប់ទាញយកព័ត៌មាន User តាមរយៈ Username នៅពេល Authentication។ ជាទូទៅ Developer អនុវត្ត Interface នេះដើម្បីទាញយក Users ពី Database។

---

### 165. What is PasswordEncoder?

#### 🇺🇸 English

PasswordEncoder is a Spring Security interface used to encode passwords and verify submitted passwords against stored encoded passwords.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

PasswordEncoder គឺជា Interface របស់ Spring Security ដែលប្រើសម្រាប់ Encode Passwords និងផ្ទៀងផ្ទាត់ Password ដែល User បញ្ចូលជាមួយ Password ដែលបាន Encode រក្សាទុកក្នុងប្រព័ន្ធ។

---

### 166. What is BCryptPasswordEncoder?

#### 🇺🇸 English

BCryptPasswordEncoder is a Spring Security implementation of PasswordEncoder that uses the BCrypt hashing algorithm to securely hash passwords. It also uses a random salt for each password.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

BCryptPasswordEncoder គឺជា Implementation របស់ PasswordEncoder ដែលប្រើ BCrypt Hashing Algorithm ដើម្បី Hash Passwords ឱ្យមានសុវត្ថិភាព។ វាក៏ប្រើ Random Salt ផ្សេងគ្នាសម្រាប់ Password នីមួយៗផងដែរ។

---

### 167. Why should we hash passwords?

#### 🇺🇸 English

We hash passwords to prevent the original passwords from being stored in plain text. If the database is compromised, attackers cannot immediately read the original passwords from the stored hashes.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

យើង Hash Passwords ដើម្បីការពារកុំឱ្យ Password ដើមត្រូវបានរក្សាទុកជាអក្សរធម្មតា (Plain Text)។ ប្រសិនបើ Database ត្រូវបានវាយប្រហារ អ្នកវាយប្រហារមិនអាចអាន Password ដើមដោយផ្ទាល់ពី Hash ដែលបានរក្សាទុកនោះទេ។

---

### 168. What is JWT?

#### 🇺🇸 English

JWT is a compact token format used to securely transmit claims between parties. In web applications, it is commonly used to carry user identity and authorization information after authentication.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

JWT គឺជា Token Format ដែលមានទំហំតូច ប្រើសម្រាប់ផ្ទេរ Claims រវាងភាគីនានាដោយមានសុវត្ថិភាព។ នៅក្នុង Web Applications វាត្រូវបានប្រើជាទូទៅសម្រាប់ផ្ទុកព័ត៌មានអត្តសញ្ញាណ និងសិទ្ធិរបស់ User បន្ទាប់ពី Authentication។

---

### 169. What does JWT stand for?

#### 🇺🇸 English

JWT stands for JSON Web Token.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

JWT គឺជាពាក្យកាត់របស់ JSON Web Token។

---

### 170. What are the three parts of JWT?

#### 🇺🇸 English

A JWT consists of three parts:
1. Header – Contains token metadata, such as the signing algorithm.
2. Payload – Contains claims, such as user ID and expiration time.
3. Signature – Used to verify that the token has not been modified.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

JWT មានផ្នែកសំខាន់ៗចំនួនបី៖
1. Header – ផ្ទុកព័ត៌មានអំពី Token ដូចជា Signing Algorithm។
2. Payload – ផ្ទុក Claims ដូចជា User ID និង Expiration Time។
3. Signature – ប្រើសម្រាប់ផ្ទៀងផ្ទាត់ថា Token មិនត្រូវបានកែប្រែ។

---

### 171. How does JWT authentication work?

#### 🇺🇸 English

The process works as follows:
1. The user sends login credentials.
2. The backend verifies the credentials.
3. The server generates a JWT.
4. The server returns the token to the client.
5. The client sends the token with subsequent requests, usually in the Authorization header.
6. A security filter validates the token.
7. If valid, the request can proceed according to the user's permissions.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

ដំណើរការមានដូចខាងក្រោម៖
1. User ផ្ញើ Login Credentials។
2. Backend ផ្ទៀងផ្ទាត់ Credentials។
3. Server បង្កើត JWT។
4. Server ផ្ញើ Token ទៅ Client។
5. Client ផ្ញើ Token ជាមួយ Requests បន្ទាប់ៗ ជាទូទៅតាមរយៈ Authorization Header។
6. Security Filter ផ្ទៀងផ្ទាត់ Token។
7. ប្រសិនបើត្រឹមត្រូវ Request អាចបន្តទៅមុខតាមសិទ្ធិរបស់ User។

---

### 172. What is JwtAuthenticationFilter?

#### 🇺🇸 English

JwtAuthenticationFilter is a custom security filter commonly used in JWT-based authentication. It extracts the JWT from the request, validates it, loads the user information, and sets the authenticated user in the SecurityContext when valid.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

JwtAuthenticationFilter គឺជា Custom Security Filter ដែលប្រើជាទូទៅក្នុង JWT Authentication។ វាយក JWT ពី Request ផ្ទៀងផ្ទាត់ Token ទាញយកព័ត៌មាន User ហើយកំណត់ User ថាបាន Authentication នៅក្នុង SecurityContext ប្រសិនបើ Token ត្រឹមត្រូវ។

---

### 173. What is OncePerRequestFilter?

#### 🇺🇸 English

OncePerRequestFilter is a Spring Web filter base class designed to execute its filtering logic once per request within a single request dispatch. It is commonly used when implementing custom JWT authentication filters.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

OncePerRequestFilter គឺជា Base Class របស់ Spring Web Filter ដែលត្រូវបានរចនាឡើងដើម្បីអនុវត្ត Filtering Logic មួយដងក្នុងមួយ Request Dispatch។ វាត្រូវបានប្រើជាទូទៅនៅពេលបង្កើត Custom JWT Authentication Filters។

---

### 174. What is SecurityContextHolder?

#### 🇺🇸 English

SecurityContextHolder is a Spring Security class that stores the current security context. It provides access to the authenticated user's information during request processing.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

SecurityContextHolder គឺជា Class របស់ Spring Security ដែលរក្សាទុក Security Context បច្ចុប្បន្ន។ វាផ្តល់លទ្ធភាពចូលប្រើព័ត៌មានរបស់ User ដែលបាន Authentication នៅពេលដំណើរការ Request។

---

### 175. What is the difference between access token and refresh token?

#### 🇺🇸 English

An access token is used to access protected resources and usually has a short expiration time. A refresh token is used to obtain a new access token without requiring the user to log in again, and it usually has a longer lifetime.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Access Token ប្រើសម្រាប់ចូលប្រើ Resources ដែលត្រូវបានការពារ ហើយជាទូទៅមាន Expiration Time ខ្លី។ ចំណែក Refresh Token ប្រើសម្រាប់ទទួលបាន Access Token ថ្មី ដោយមិនចាំបាច់ឱ្យ User Login ម្តងទៀត ហើយជាទូទៅមានអាយុកាលវែងជាង។

---

### 176. What is session-based authentication?

#### 🇺🇸 English

Session-based authentication is an authentication method where the server creates and maintains a session after a user successfully logs in. The client receives a session identifier, usually stored in a cookie, and sends it with subsequent requests.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

Session-based Authentication គឺជាវិធីសាស្ត្រ Authentication ដែល Server បង្កើត និងគ្រប់គ្រង Session បន្ទាប់ពី User Login បានជោគជ័យ។ Client ទទួលបាន Session Identifier ដែលជាទូទៅរក្សាទុកក្នុង Cookie ហើយផ្ញើវាជាមួយ Requests បន្ទាប់ៗ។

---

### 177. What is the difference between JWT and session-based authentication?

#### 🇺🇸 English

In session-based authentication, the server maintains session state and the client sends a session identifier. In JWT authentication, the client sends a signed token containing claims, and the server validates the token. JWT can reduce the need for centralized session storage, but token revocation and secure storage require careful design.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

នៅក្នុង Session-based Authentication Server រក្សាទុក Session State ហើយ Client ផ្ញើ Session Identifier។ ចំណែក JWT Authentication Client ផ្ញើ Signed Token ដែលមាន Claims ហើយ Server ផ្ទៀងផ្ទាត់ Token នោះ។ JWT អាចកាត់បន្ថយតម្រូវការរក្សាទុក Session នៅកន្លែងកណ្តាល ប៉ុន្តែការលុបចោល Token និងការរក្សាទុក Token ឱ្យមានសុវត្ថិភាពត្រូវការការរចនាឱ្យបានត្រឹមត្រូវ។

---

### 178. What is CSRF?

#### 🇺🇸 English

CSRF stands for Cross-Site Request Forgery. It is an attack where an attacker tricks an authenticated user's browser into sending an unwanted request to a website where the user is already logged in.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

CSRF មានន័យថា Cross-Site Request Forgery។ វាជាការវាយប្រហារដែលអ្នកវាយប្រហារបោកបញ្ឆោត Browser របស់ User ដែលបាន Login រួច ឱ្យផ្ញើ Request ដែល User មិនចង់បានទៅកាន់ Website នោះ។

---

### 179. What is CORS?

#### 🇺🇸 English

CORS stands for Cross-Origin Resource Sharing. It is a browser security mechanism that controls whether a web application from one origin is allowed to access resources from another origin.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

CORS មានន័យថា Cross-Origin Resource Sharing។ វាជាយន្តការសុវត្ថិភាពរបស់ Browser ដែលគ្រប់គ្រងថា Web Application ពី Origin មួយអាចចូលប្រើ Resources ពី Origin មួយផ្សេងទៀតបានឬអត់។

---

### 180. How do you secure REST APIs?

#### 🇺🇸 English

I secure REST APIs using Spring Security and JWT authentication. I hash passwords with BCrypt, configure endpoint authorization based on roles, validate incoming data, configure CORS correctly, and protect sensitive information. I also use HTTPS in production.

#### 🇰🇭 ភាសាខ្មែរ (Khmer)

ខ្ញុំការពារ REST APIs ដោយប្រើ Spring Security និង JWT Authentication។ ខ្ញុំ Hash Passwords ដោយប្រើ BCrypt កំណត់ Endpoint Authorization តាម Roles Validate ទិន្នន័យដែលចូលមក កំណត់ CORS ឱ្យបានត្រឹមត្រូវ និងការពារព័ត៌មានសម្ងាត់។ ខ្ញុំក៏ប្រើ HTTPS នៅក្នុង Production ផងដែរ។

---

