declare global {
    interface Post {
      image: string;
      title: string;
      summary: string;
      slug: string;
    }
  }
  
  export {}; // Ensures this file is treated as a module
  