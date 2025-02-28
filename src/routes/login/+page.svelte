<script>
    // State variables
    let email = '';
    let password = '';
    let loading = false;
    let error = null;
    let successMessage = null;

    /**
     * Handle form submission
     * @param {Event} event - Form submission event
     */
    async function handleSubmit(event) {
        event.preventDefault();

        // Reset state
        loading = true;
        error = null;
        successMessage = null;

        try {
            // Send login request to API
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Authentication failed');
            }

            // Display success message
            successMessage = data.message || 'Login successful!';

            // Clear form fields after successful login
            email = '';
            password = '';

        } catch (err) {
            // Display error message
            error = err.message;
        } finally {
            loading = false;
        }
    }
</script>

<div class="login-container">
    <h2>Login</h2>

    {#if successMessage}
        <div class="success-message">
            <p>{successMessage}</p>
        </div>
    {/if}

    {#if error}
        <div class="error-message">
            <p>{error}</p>
        </div>
    {/if}

    <form on:submit={handleSubmit}>
        <div class="form-group">
            <label for="email">Email</label>
            <input
                    type="email"
                    id="email"
                    bind:value={email}
                    required
                    disabled={loading}
                    placeholder="Enter your email"
            >
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <input
                    type="password"
                    id="password"
                    bind:value={password}
                    required
                    disabled={loading}
                    placeholder="Enter your password"
            >
        </div>

        <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
        </button>
    </form>
</div>

<style>
    .login-container {
        width: 100%;
        margin: 2rem auto;
        padding: 1.5rem;
        padding-right : 3rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        background-color: #fff;
    }

    h2 {
        text-align: center;
        margin-bottom: 1.5rem;
        color: var(--color-theme-1);
    }

    .form-group {
        margin-bottom: 1rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
    }

    input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
    }

    input:focus {
        outline: none;
        border-color: var(--color-theme-1);
        box-shadow: 0 0 0 2px rgba(255, 62, 0, 0.2);
    }

    button {
        background-color: var(--color-theme-1);
        color: white;
        border: none;
        padding: 0.75rem;
        border-radius: 4px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: opacity 0.2s;
        margin-top: 0.5rem;
    }

    button:hover:not(:disabled) {
        opacity: 0.9;
    }

    button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .error-message {
        background-color: #ffebee;
        border-radius: 4px;
        padding: 0.75rem;
        margin-bottom: 1rem;
        border-left: 4px solid #f44336;
    }

    .error-message p {
        margin: 0;
        color: #d32f2f;
    }

    .success-message {
        background-color: #e8f5e9;
        border-radius: 4px;
        padding: 0.75rem;
        margin-bottom: 1rem;
        border-left: 4px solid #4caf50;
    }

    .success-message p {
        margin: 0;
        color: #2e7d32;
    }
</style>