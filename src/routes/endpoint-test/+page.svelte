<script>
    import { onMount } from 'svelte';

    let users = [];
    let loading = true;
    let error = null;
    let deleteLoading = false;

    // Form data
    let firstName = '';
    let lastName = '';
    let email = '';
    let password = '';

    onMount(async () => {
        try {
            const response = await fetch('/api/users');
            if (!response.ok) throw new Error('Failed to fetch users');
            users = await response.json();
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    });

    async function handleSubmit() {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password
                })
            });

            if (!response.ok) throw new Error('Failed to create user');

            const newUser = await response.json();
            users = [...users, newUser];

            // Reset form
            firstName = '';
            lastName = '';
            email = '';
            password = '';

        } catch (e) {
            error = e.message;
        }
    }

    /**
     * Deletes a user from the database
     * @param {number} id - The ID of the user to delete
     */
    async function deleteUser(id) {
        if (!confirm('Are you sure you want to delete this user?')) {
            return;
        }

        deleteLoading = true;
        try {
            const response = await fetch(`/api/users/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete user');

            // Update the users array locally to remove the deleted user
            users = users.filter(user => user.id !== id);

        } catch (e) {
            error = e.message;
        } finally {
            deleteLoading = false;
        }
    }
</script>

<h1>SvelteKit + Drizzle + Neon PostgreSQL Demo</h1>

<div class="container">
    <div class="user-form">
        <h2>Add New User</h2>
        <form on:submit|preventDefault={handleSubmit}>
            <div class="form-group">
                <label for="firstName">First Name</label>
                <input type="text" id="firstName" bind:value={firstName} required>
            </div>

            <div class="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" id="lastName" bind:value={lastName} required>
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" bind:value={email} required>
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" bind:value={password} required>
            </div>

            <button type="submit">Add User</button>
        </form>
    </div>

    <div class="users-list">
        <h2>Users List</h2>

        {#if loading}
            <p>Loading users...</p>
        {:else if error}
            <p class="error">Error: {error}</p>
        {:else if users.length === 0}
            <p>No users found. Add one above!</p>
        {:else}
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {#each users as user}
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.firstName} {user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.role || 'guest'}</td>
                        <td>
                            <button
                                    class="delete-btn"
                                    on:click={() => deleteUser(user.id)}
                                    disabled={deleteLoading}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                {/each}
                </tbody>
            </table>
        {/if}
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
        padding: 1rem;
    }

    .user-form, .users-list {
        flex: 1;
        min-width: 300px;
    }

    .form-group {
        margin-bottom: 1rem;
    }

    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
    }

    .form-group input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    button {
        background-color: var(--color-theme-1);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        opacity: 0.9;
    }

    button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .delete-btn {
        background-color: #e53935;
        padding: 0.3rem 0.6rem;
        font-size: 0.85rem;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        padding: 0.5rem;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    th {
        background-color: #f2f2f2;
    }

    .error {
        color: red;
    }
</style>