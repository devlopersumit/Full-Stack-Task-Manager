// Remove HTML tags and script content to prevent XSS
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
};

// Validate task input
export const validateTaskInput = (title, description) => {
  const errors = {};

  if (!title || title.trim() === '') {
    errors.title = 'Title is required';
  } else if (title.length > 100) {
    errors.title = 'Title cannot exceed 100 characters';
  }

  if (!description || description.trim() === '') {
    errors.description = 'Description is required';
  } else if (description.length > 500) {
    errors.description = 'Description cannot exceed 500 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};