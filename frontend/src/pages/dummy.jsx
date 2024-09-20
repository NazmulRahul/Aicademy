var subjects = [
    { email: "nazmul@gmail.com", subject: "Java" },
    { email: "nazmul@gmail.com", subject: "Mathematics" },
    { email: "nazmul2@gmail.com", subject: "Physics" },
    { email: "nazmul@gmail.com", subject: "Chemistry" },
    { email: "nazmul@gmail.com", subject: "Biology" },
    { email: "nazmul@gmail.com", subject: "History" },
    { email: "nazmul@gmail.com", subject: "Literature" },
    { email: "nazmul@gmail.com", subject: "Computer Science" },
    { email: "nazmul@gmail.com", subject: "Economics" },
    { email: "nazmul@gmail.com", subject: "Geography" },
];
var topics = [
    {
        email: "nazmul@gmail.com",
        subject: "Java",
        topic: "Polymorphism",
        content:
            '<div class="w-full p-6">\n' +
            '  <h1 class="text-4xl font-bold mb-4">Polymorphism in Java</h1>\n' +
            '  <p class="mb-4">\n' +
            "    Polymorphism is a core concept in object-oriented programming that allows objects of different classes to be treated as objects of a common superclass. It provides a way to perform a single action in different forms. In Java, polymorphism is mainly achieved through method overriding and interfaces.\n" +
            "  </p>\n" +
            "  \n" +
            '  <h2 class="text-2xl font-semibold mb-2">Types of Polymorphism</h2>\n' +
            '  <p class="mb-4">\n' +
            "    Polymorphism in Java can be categorized into two types:\n" +
            "  </p>\n" +
            "  \n" +
            '  <h3 class="text-xl font-medium mb-2">1. Compile-Time Polymorphism (Static Binding)</h3>\n' +
            '  <p class="mb-4">\n' +
            "    Compile-time polymorphism is achieved using method overloading. Method overloading is when multiple methods in the same class have the same name but different parameters.\n" +
            "  </p>\n" +
            "  \n" +
            '  <h3 class="text-xl font-medium mb-2">2. Runtime Polymorphism (Dynamic Binding)</h3>\n' +
            '  <p class="mb-6">\n' +
            "    Runtime polymorphism is achieved using method overriding. Method overriding occurs when a subclass provides a specific implementation of a method that is already defined in its superclass.\n" +
            "  </p>\n" +
            "  \n" +
            '  <h2 class="text-2xl font-semibold mb-2">Example of Polymorphism</h2>\n' +
            '  <pre class="bg-gray-100 p-4 rounded-md mb-6">\n' +
            "    <code>\n" +
            "      // Base class\n" +
            "      class Animal {\n" +
            "          void sound() {\n" +
            '              System.out.println("Animal makes a sound");\n' +
            "          }\n" +
            "      }\n" +
            "\n" +
            "      // Derived class\n" +
            "      class Dog extends Animal {\n" +
            "          void sound() {\n" +
            '              System.out.println("Dog barks");\n' +
            "          }\n" +
            "      }\n" +
            "\n" +
            "      public class TestPolymorphism {\n" +
            "          public static void main(String[] args) {\n" +
            "              Animal myAnimal = new Animal();\n" +
            "              Animal myDog = new Dog();\n" +
            "\n" +
            "              myAnimal.sound();  // Output: Animal makes a sound\n" +
            "              myDog.sound();     // Output: Dog barks\n" +
            "          }\n" +
            "      }\n" +
            "    </code>\n" +
            "  </pre>\n" +
            "  \n" +
            '  <h2 class="text-2xl font-semibold mb-2">Learn More</h2>\n' +
            '  <p class="mb-4">\n' +
            "    For a more comprehensive understanding of polymorphism in Java, you can watch the following YouTube video:\n" +
            "  </p>\n" +
            '  <a href="https://www.youtube.com/watch?v=EX9JkXOqAG8" class="text-blue-500 underline">Polymorphism in Java - YouTube</a>\n' +
            "</div>",
    },
    {
        email: "nazmul@gmail.com",
        subject: "Java",
        topic: "Polymorphism",
        content:
            '<div class="w-full p-6">\n' +
            '  <h1 class="text-3xl font-bold mb-4">Polymorphism in Java</h1>\n' +
            '  <p class="mb-4">\n' +
            "    Polymorphism is a core concept in object-oriented programming that allows objects of different classes to be treated as objects of a common superclass. It provides a way to perform a single action in different forms. In Java, polymorphism is mainly achieved through method overriding and interfaces.\n" +
            "  </p>\n" +
            "  \n" +
            '  <h2 class="text-2xl font-semibold mb-2">Types of Polymorphism</h2>\n' +
            '  <p class="mb-4">\n' +
            "    Polymorphism in Java can be categorized into two types:\n" +
            "  </p>\n" +
            "  \n" +
            '  <h3 class="text-xl font-medium mb-2">1. Compile-Time Polymorphism (Static Binding)</h3>\n' +
            '  <p class="mb-4">\n' +
            "    Compile-time polymorphism is achieved using method overloading. Method overloading is when multiple methods in the same class have the same name but different parameters.\n" +
            "  </p>\n" +
            "  \n" +
            '  <h3 class="text-xl font-medium mb-2">2. Runtime Polymorphism (Dynamic Binding)</h3>\n' +
            '  <p class="mb-6">\n' +
            "    Runtime polymorphism is achieved using method overriding. Method overriding occurs when a subclass provides a specific implementation of a method that is already defined in its superclass.\n" +
            "  </p>\n" +
            "  \n" +
            '  <h2 class="text-2xl font-semibold mb-2">Example of Polymorphism</h2>\n' +
            '  <pre class="bg-gray-100 p-4 rounded-md mb-6">\n' +
            "    <code>\n" +
            "      // Base class\n" +
            "      class Animal {\n" +
            "          void sound() {\n" +
            '              System.out.println("Animal makes a sound");\n' +
            "          }\n" +
            "      }\n" +
            "\n" +
            "      // Derived class\n" +
            "      class Dog extends Animal {\n" +
            "          void sound() {\n" +
            '              System.out.println("Dog barks");\n' +
            "          }\n" +
            "      }\n" +
            "\n" +
            "      public class TestPolymorphism {\n" +
            "          public static void main(String[] args) {\n" +
            "              Animal myAnimal = new Animal();\n" +
            "              Animal myDog = new Dog();\n" +
            "\n" +
            "              myAnimal.sound();  // Output: Animal makes a sound\n" +
            "              myDog.sound();     // Output: Dog barks\n" +
            "          }\n" +
            "      }\n" +
            "    </code>\n" +
            "  </pre>\n" +
            "  \n" +
            '  <h2 class="text-2xl font-semibold mb-2">Learn More</h2>\n' +
            '  <p class="mb-4">\n' +
            "    For a more comprehensive understanding of polymorphism in Java, you can watch the following YouTube video:\n" +
            "  </p>\n" +
            '  <a href="https://www.youtube.com/watch?v=EX9JkXOqAG8" class="text-blue-500 underline">Polymorphism in Java - YouTube</a>\n' +
            "</div>",
    },
    {
        email: "nazmul@gmail.com",
        subject: "Java",
        topic: "Polymorphism",
        content:
            '<div class="w-full p-6">\n' +
            '  <h1 class="text-3xl font-bold mb-4">Polymorphism in Java</h1>\n' +
            '  <p class="mb-4">\n' +
            "    Polymorphism is a core concept in object-oriented programming that allows objects of different classes to be treated as objects of a common superclass. It provides a way to perform a single action in different forms. In Java, polymorphism is mainly achieved through method overriding and interfaces.\n" +
            "  </p>\n" +
            "  \n" +
            '  <h2 class="text-2xl font-semibold mb-2">Types of Polymorphism</h2>\n' +
            '  <p class="mb-4">\n' +
            "    Polymorphism in Java can be categorized into two types:\n" +
            "  </p>\n" +
            "  \n" +
            '  <h3 class="text-xl font-medium mb-2">1. Compile-Time Polymorphism (Static Binding)</h3>\n' +
            '  <p class="mb-4">\n' +
            "    Compile-time polymorphism is achieved using method overloading. Method overloading is when multiple methods in the same class have the same name but different parameters.\n" +
            "  </p>\n" +
            "  \n" +
            '  <h3 class="text-xl font-medium mb-2">2. Runtime Polymorphism (Dynamic Binding)</h3>\n' +
            '  <p class="mb-6">\n' +
            "    Runtime polymorphism is achieved using method overriding. Method overriding occurs when a subclass provides a specific implementation of a method that is already defined in its superclass.\n" +
            "  </p>\n" +
            "  \n" +
            '  <h2 class="text-2xl font-semibold mb-2">Example of Polymorphism</h2>\n' +
            '  <pre class="bg-gray-100 p-4 rounded-md mb-6">\n' +
            "    <code>\n" +
            "      // Base class\n" +
            "      class Animal {\n" +
            "          void sound() {\n" +
            '              System.out.println("Animal makes a sound");\n' +
            "          }\n" +
            "      }\n" +
            "\n" +
            "      // Derived class\n" +
            "      class Dog extends Animal {\n" +
            "          void sound() {\n" +
            '              System.out.println("Dog barks");\n' +
            "          }\n" +
            "      }\n" +
            "\n" +
            "      public class TestPolymorphism {\n" +
            "          public static void main(String[] args) {\n" +
            "              Animal myAnimal = new Animal();\n" +
            "              Animal myDog = new Dog();\n" +
            "\n" +
            "              myAnimal.sound();  // Output: Animal makes a sound\n" +
            "              myDog.sound();     // Output: Dog barks\n" +
            "          }\n" +
            "      }\n" +
            "    </code>\n" +
            "  </pre>\n" +
            "  \n" +
            '  <h2 class="text-2xl font-semibold mb-2">Learn More</h2>\n' +
            '  <p class="mb-4">\n' +
            "    For a more comprehensive understanding of polymorphism in Java, you can watch the following YouTube video:\n" +
            "  </p>\n" +
            '  <a href="https://www.youtube.com/watch?v=EX9JkXOqAG8" class="text-blue-500 underline">Polymorphism in Java - YouTube</a>\n' +
            "</div>",
    },
    {
        email: "nazmul@gmail.com",
        subject: "Java",
        topic: "Polymorphism",
        content:
            '<div class="w-full p-6">\n' +
            '  <h1 class="text-3xl font-bold mb-4">Polymorphism in Java</h1>\n' +
            '  <p class="mb-4">\n' +
            "    Polymorphism is a core concept in object-oriented programming that allows objects of different classes to be treated as objects of a common superclass. It provides a way to perform a single action in different forms. In Java, polymorphism is mainly achieved through method overriding and interfaces.\n" +
            "  </p>\n" +
            "  \n" +
            '  <h2 class="text-2xl font-semibold mb-2">Types of Polymorphism</h2>\n' +
            '  <p class="mb-4">\n' +
            "    Polymorphism in Java can be categorized into two types:\n" +
            "  </p>\n" +
            "  \n" +
            '  <h3 class="text-xl font-medium mb-2">1. Compile-Time Polymorphism (Static Binding)</h3>\n' +
            '  <p class="mb-4">\n' +
            "    Compile-time polymorphism is achieved using method overloading. Method overloading is when multiple methods in the same class have the same name but different parameters.\n" +
            "  </p>\n" +
            "  \n" +
            '  <h3 class="text-xl font-medium mb-2">2. Runtime Polymorphism (Dynamic Binding)</h3>\n' +
            '  <p class="mb-6">\n' +
            "    Runtime polymorphism is achieved using method overriding. Method overriding occurs when a subclass provides a specific implementation of a method that is already defined in its superclass.\n" +
            "  </p>\n" +
            "  \n" +
            '  <h2 class="text-2xl font-semibold mb-2">Example of Polymorphism</h2>\n' +
            '  <pre class="bg-gray-100 p-4 rounded-md mb-6">\n' +
            "    <code>\n" +
            "      // Base class\n" +
            "      class Animal {\n" +
            "          void sound() {\n" +
            '              System.out.println("Animal makes a sound");\n' +
            "          }\n" +
            "      }\n" +
            "\n" +
            "      // Derived class\n" +
            "      class Dog extends Animal {\n" +
            "          void sound() {\n" +
            '              System.out.println("Dog barks");\n' +
            "          }\n" +
            "      }\n" +
            "\n" +
            "      public class TestPolymorphism {\n" +
            "          public static void main(String[] args) {\n" +
            "              Animal myAnimal = new Animal();\n" +
            "              Animal myDog = new Dog();\n" +
            "\n" +
            "              myAnimal.sound();  // Output: Animal makes a sound\n" +
            "              myDog.sound();     // Output: Dog barks\n" +
            "          }\n" +
            "      }\n" +
            "    </code>\n" +
            "  </pre>\n" +
            "  \n" +
            '  <h2 class="text-2xl font-semibold mb-2">Learn More</h2>\n' +
            '  <p class="mb-4">\n' +
            "    For a more comprehensive understanding of polymorphism in Java, you can watch the following YouTube video:\n" +
            "  </p>\n" +
            '  <a href="https://www.youtube.com/watch?v=EX9JkXOqAG8" class="text-blue-500 underline">Polymorphism in Java - YouTube</a>\n' +
            "</div>",
    },
    {
        email: "nazmul@gmail.com",
        subject: "Java",
        topic: "Polymorphism",
        content:
            '<div class="w-full p-6">\n' +
            '  <h1 class="text-3xl font-bold mb-4">Polymorphism in Java</h1>\n' +
            '  <p class="mb-4">\n' +
            "    Polymorphism is a core concept in object-oriented programming that allows objects of different classes to be treated as objects of a common superclass. It provides a way to perform a single action in different forms. In Java, polymorphism is mainly achieved through method overriding and interfaces.\n" +
            "  </p>\n" +
            "  \n" +
            '  <h2 class="text-2xl font-semibold mb-2">Types of Polymorphism</h2>\n' +
            '  <p class="mb-4">\n' +
            "    Polymorphism in Java can be categorized into two types:\n" +
            "  </p>\n" +
            "  \n" +
            '  <h3 class="text-xl font-medium mb-2">1. Compile-Time Polymorphism (Static Binding)</h3>\n' +
            '  <p class="mb-4">\n' +
            "    Compile-time polymorphism is achieved using method overloading. Method overloading is when multiple methods in the same class have the same name but different parameters.\n" +
            "  </p>\n" +
            "  \n" +
            '  <h3 class="text-xl font-medium mb-2">2. Runtime Polymorphism (Dynamic Binding)</h3>\n' +
            '  <p class="mb-6">\n' +
            "    Runtime polymorphism is achieved using method overriding. Method overriding occurs when a subclass provides a specific implementation of a method that is already defined in its superclass.\n" +
            "  </p>\n" +
            "  \n" +
            '  <h2 class="text-2xl font-semibold mb-2">Example of Polymorphism</h2>\n' +
            '  <pre class="bg-gray-100 p-4 rounded-md mb-6">\n' +
            "    <code>\n" +
            "      // Base class\n" +
            "      class Animal {\n" +
            "          void sound() {\n" +
            '              System.out.println("Animal makes a sound");\n' +
            "          }\n" +
            "      }\n" +
            "\n" +
            "      // Derived class\n" +
            "      class Dog extends Animal {\n" +
            "          void sound() {\n" +
            '              System.out.println("Dog barks");\n' +
            "          }\n" +
            "      }\n" +
            "\n" +
            "      public class TestPolymorphism {\n" +
            "          public static void main(String[] args) {\n" +
            "              Animal myAnimal = new Animal();\n" +
            "              Animal myDog = new Dog();\n" +
            "\n" +
            "              myAnimal.sound();  // Output: Animal makes a sound\n" +
            "              myDog.sound();     // Output: Dog barks\n" +
            "          }\n" +
            "      }\n" +
            "    </code>\n" +
            "  </pre>\n" +
            "  \n" +
            '  <h2 class="text-2xl font-semibold mb-2">Learn More</h2>\n' +
            '  <p class="mb-4">\n' +
            "    For a more comprehensive understanding of polymorphism in Java, you can watch the following YouTube video:\n" +
            "  </p>\n" +
            '  <a href="https://www.youtube.com/watch?v=EX9JkXOqAG8" class="text-blue-500 underline">Polymorphism in Java - YouTube</a>\n' +
            "</div>",
    },
    {
        email: "nazmul@gmail.com",
        subject: "Java",
        topic: "Polymorphism",
        content:
            '<div class="w-full p-6">\n' +
            '  <h1 class="text-3xl font-bold mb-4">Polymorphism in Java</h1>\n' +
            '  <p class="mb-4">\n' +
            "    Polymorphism is a core concept in object-oriented programming that allows objects of different classes to be treated as objects of a common superclass. It provides a way to perform a single action in different forms. In Java, polymorphism is mainly achieved through method overriding and interfaces.\n" +
            "  </p>\n" +
            "  \n" +
            '  <h2 class="text-2xl font-semibold mb-2">Types of Polymorphism</h2>\n' +
            '  <p class="mb-4">\n' +
            "    Polymorphism in Java can be categorized into two types:\n" +
            "  </p>\n" +
            "  \n" +
            '  <h3 class="text-xl font-medium mb-2">1. Compile-Time Polymorphism (Static Binding)</h3>\n' +
            '  <p class="mb-4">\n' +
            "    Compile-time polymorphism is achieved using method overloading. Method overloading is when multiple methods in the same class have the same name but different parameters.\n" +
            "  </p>\n" +
            "  \n" +
            '  <h3 class="text-xl font-medium mb-2">2. Runtime Polymorphism (Dynamic Binding)</h3>\n' +
            '  <p class="mb-6">\n' +
            "    Runtime polymorphism is achieved using method overriding. Method overriding occurs when a subclass provides a specific implementation of a method that is already defined in its superclass.\n" +
            "  </p>\n" +
            "  \n" +
            '  <h2 class="text-2xl font-semibold mb-2">Example of Polymorphism</h2>\n' +
            '  <pre class="bg-gray-100 p-4 rounded-md mb-6">\n' +
            "    <code>\n" +
            "      // Base class\n" +
            "      class Animal {\n" +
            "          void sound() {\n" +
            '              System.out.println("Animal makes a sound");\n' +
            "          }\n" +
            "      }\n" +
            "\n" +
            "      // Derived class\n" +
            "      class Dog extends Animal {\n" +
            "          void sound() {\n" +
            '              System.out.println("Dog barks");\n' +
            "          }\n" +
            "      }\n" +
            "\n" +
            "      public class TestPolymorphism {\n" +
            "          public static void main(String[] args) {\n" +
            "              Animal myAnimal = new Animal();\n" +
            "              Animal myDog = new Dog();\n" +
            "\n" +
            "              myAnimal.sound();  // Output: Animal makes a sound\n" +
            "              myDog.sound();     // Output: Dog barks\n" +
            "          }\n" +
            "      }\n" +
            "    </code>\n" +
            "  </pre>\n" +
            "  \n" +
            '  <h2 class="text-2xl font-semibold mb-2">Learn More</h2>\n' +
            '  <p class="mb-4">\n' +
            "    For a more comprehensive understanding of polymorphism in Java, you can watch the following YouTube video:\n" +
            "  </p>\n" +
            '  <a href="https://www.youtube.com/watch?v=EX9JkXOqAG8" class="text-blue-500 underline">Polymorphism in Java - YouTube</a>\n' +
            "</div>",
    },
    {
        email: "nazmul@gmail.com",
        subject: "Java",
        topic: "Polymorphism",
        content:
            '<div class="w-full p-6">\n' +
            '  <h1 class="text-3xl font-bold mb-4">Polymorphism in Java</h1>\n' +
            '  <p class="mb-4">\n' +
            "    Polymorphism is a core concept in object-oriented programming that allows objects of different classes to be treated as objects of a common superclass. It provides a way to perform a single action in different forms. In Java, polymorphism is mainly achieved through method overriding and interfaces.\n" +
            "  </p>\n" +
            "  \n" +
            '  <h2 class="text-2xl font-semibold mb-2">Types of Polymorphism</h2>\n' +
            '  <p class="mb-4">\n' +
            "    Polymorphism in Java can be categorized into two types:\n" +
            "  </p>\n" +
            "  \n" +
            '  <h3 class="text-xl font-medium mb-2">1. Compile-Time Polymorphism (Static Binding)</h3>\n' +
            '  <p class="mb-4">\n' +
            "    Compile-time polymorphism is achieved using method overloading. Method overloading is when multiple methods in the same class have the same name but different parameters.\n" +
            "  </p>\n" +
            "  \n" +
            '  <h3 class="text-xl font-medium mb-2">2. Runtime Polymorphism (Dynamic Binding)</h3>\n' +
            '  <p class="mb-6">\n' +
            "    Runtime polymorphism is achieved using method overriding. Method overriding occurs when a subclass provides a specific implementation of a method that is already defined in its superclass.\n" +
            "  </p>\n" +
            "  \n" +
            '  <h2 class="text-2xl font-semibold mb-2">Example of Polymorphism</h2>\n' +
            '  <pre class="bg-gray-100 p-4 rounded-md mb-6">\n' +
            "    <code>\n" +
            "      // Base class\n" +
            "      class Animal {\n" +
            "          void sound() {\n" +
            '              System.out.println("Animal makes a sound");\n' +
            "          }\n" +
            "      }\n" +
            "\n" +
            "      // Derived class\n" +
            "      class Dog extends Animal {\n" +
            "          void sound() {\n" +
            '              System.out.println("Dog barks");\n' +
            "          }\n" +
            "      }\n" +
            "\n" +
            "      public class TestPolymorphism {\n" +
            "          public static void main(String[] args) {\n" +
            "              Animal myAnimal = new Animal();\n" +
            "              Animal myDog = new Dog();\n" +
            "\n" +
            "              myAnimal.sound();  // Output: Animal makes a sound\n" +
            "              myDog.sound();     // Output: Dog barks\n" +
            "          }\n" +
            "      }\n" +
            "    </code>\n" +
            "  </pre>\n" +
            "  \n" +
            '  <h2 class="text-2xl font-semibold mb-2">Learn More</h2>\n' +
            '  <p class="mb-4">\n' +
            "    For a more comprehensive understanding of polymorphism in Java, you can watch the following YouTube video:\n" +
            "  </p>\n" +
            '  <a href="https://www.youtube.com/watch?v=EX9JkXOqAG8" class="text-blue-500 underline">Polymorphism in Java - YouTube</a>\n' +
            "</div>",
    },
    {
        email: "nazmul@gmail.com",
        subject: "Java",
        topic: "Polymorphism",
        content:
            '<div class="w-full p-6">\n' +
            '  <h1 class="text-3xl font-bold mb-4">Polymorphism in Java</h1>\n' +
            '  <p class="mb-4">\n' +
            "    Polymorphism is a core concept in object-oriented programming that allows objects of different classes to be treated as objects of a common superclass. It provides a way to perform a single action in different forms. In Java, polymorphism is mainly achieved through method overriding and interfaces.\n" +
            "  </p>\n" +
            "  \n" +
            '  <h2 class="text-2xl font-semibold mb-2">Types of Polymorphism</h2>\n' +
            '  <p class="mb-4">\n' +
            "    Polymorphism in Java can be categorized into two types:\n" +
            "  </p>\n" +
            "  \n" +
            '  <h3 class="text-xl font-medium mb-2">1. Compile-Time Polymorphism (Static Binding)</h3>\n' +
            '  <p class="mb-4">\n' +
            "    Compile-time polymorphism is achieved using method overloading. Method overloading is when multiple methods in the same class have the same name but different parameters.\n" +
            "  </p>\n" +
            "  \n" +
            '  <h3 class="text-xl font-medium mb-2">2. Runtime Polymorphism (Dynamic Binding)</h3>\n' +
            '  <p class="mb-6">\n' +
            "    Runtime polymorphism is achieved using method overriding. Method overriding occurs when a subclass provides a specific implementation of a method that is already defined in its superclass.\n" +
            "  </p>\n" +
            "  \n" +
            '  <h2 class="text-2xl font-semibold mb-2">Example of Polymorphism</h2>\n' +
            '  <pre class="bg-gray-100 p-4 rounded-md mb-6">\n' +
            "    <code>\n" +
            "      // Base class\n" +
            "      class Animal {\n" +
            "          void sound() {\n" +
            '              System.out.println("Animal makes a sound");\n' +
            "          }\n" +
            "      }\n" +
            "\n" +
            "      // Derived class\n" +
            "      class Dog extends Animal {\n" +
            "          void sound() {\n" +
            '              System.out.println("Dog barks");\n' +
            "          }\n" +
            "      }\n" +
            "\n" +
            "      public class TestPolymorphism {\n" +
            "          public static void main(String[] args) {\n" +
            "              Animal myAnimal = new Animal();\n" +
            "              Animal myDog = new Dog();\n" +
            "\n" +
            "              myAnimal.sound();  // Output: Animal makes a sound\n" +
            "              myDog.sound();     // Output: Dog barks\n" +
            "          }\n" +
            "      }\n" +
            "    </code>\n" +
            "  </pre>\n" +
            "  \n" +
            '  <h2 class="text-2xl font-semibold mb-2">Learn More</h2>\n' +
            '  <p class="mb-4">\n' +
            "    For a more comprehensive understanding of polymorphism in Java, you can watch the following YouTube video:\n" +
            "  </p>\n" +
            '  <a href="https://www.youtube.com/watch?v=EX9JkXOqAG8" class="text-blue-500 underline">Polymorphism in Java - YouTube</a>\n' +
            "</div>",
    },
];