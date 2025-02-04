// Form validation and submission handling
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    
    // Form validation configuration
    const inputs = {
        name: {
            element: document.getElementById('name'),
            validation: (value) => value.length >= 2,
            errorMessage: 'Name must be at least 2 characters long'
        },
        email: {
            element: document.getElementById('email'),
            validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            errorMessage: 'Please enter a valid email address'
        },
        company: {
            element: document.getElementById('company'),
            validation: (value) => value.length >= 2,
            errorMessage: 'Company name must be at least 2 characters long'
        },
        phone: {
            element: document.getElementById('phone'),
            validation: (value) => /^[\d\s+()-]{10,}$/.test(value),
            errorMessage: 'Please enter a valid phone number'
        },
        challenge: {
            element: document.getElementById('challenge'),
            validation: (value) => value.length >= 10,
            errorMessage: 'Please provide more details about your challenge'
        }
    };

    // Add validation feedback elements
    Object.keys(inputs).forEach(inputName => {
        const input = inputs[inputName].element;
        const wrapper = input.parentElement;
        
        // Create feedback elements
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'validation-feedback';
        wrapper.appendChild(feedbackDiv);
        
        // Add input event listeners
        input.addEventListener('input', () => validateInput(inputName));
        input.addEventListener('blur', () => validateInput(inputName));
    });

    // Validation function
    function validateInput(inputName) {
        const { element, validation, errorMessage } = inputs[inputName];
        const value = element.value.trim();
        const wrapper = element.parentElement;
        const feedbackDiv = wrapper.querySelector('.validation-feedback');
        
        const isValid = validation(value);
        
        // Update validation state
        element.classList.toggle('is-valid', isValid);
        element.classList.toggle('is-invalid', !isValid);
        
        // Update feedback message
        feedbackDiv.textContent = isValid ? '' : errorMessage;
        feedbackDiv.className = 'validation-feedback ' + (isValid ? 'valid-feedback' : 'invalid-feedback');
        
        return isValid;
    }

    // Form submission handler
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all inputs
        let isValid = true;
        Object.keys(inputs).forEach(inputName => {
            if (!validateInput(inputName)) {
                isValid = false;
            }
        });

        if (!isValid) {
            showNotification('Please correct the errors before submitting.', 'error');
            return;
        }

        // Collect form data
        const formData = {
            name: inputs.name.element.value.trim(),
            email: inputs.email.element.value.trim(),
            company: inputs.company.element.value.trim(),
            phone: inputs.phone.element.value.trim(),
            challenge: inputs.challenge.element.value.trim(),
            timestamp: new Date().toISOString()
        };

        try {
            // Here you would typically send the data to your backend
            // For demo, we'll just log to console and show success message
            console.log('Form submission:', formData);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            showNotification('Thank you! We\'ll be in touch soon.', 'success');
            form.reset();
            
            // Reset validation states
            Object.keys(inputs).forEach(inputName => {
                const element = inputs[inputName].element;
                element.classList.remove('is-valid', 'is-invalid');
                const wrapper = element.parentElement;
                wrapper.querySelector('.validation-feedback').textContent = '';
            });

        } catch (error) {
            console.error('Submission error:', error);
            showNotification('Something went wrong. Please try again later.', 'error');
        }
    });

    // Notification helper
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
});