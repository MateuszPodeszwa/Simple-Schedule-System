<svelte:head>
	<title>About</title>
	<meta name="description" content="About this employee information system" />
</svelte:head>

<div class="text-column">
	<h1>About this Project</h1>

	<p>
		This is an employee information system built with <a href="https://svelte.dev/docs/kit">SvelteKit</a>.
		It aims to provide relevant information to employees in an accessible and user-friendly format.
	</p>

	<h2>Current Status</h2>
	<p>
		Currently, the application is in its early stages, functioning as a basic calculator based on the SvelteKit
		template. This first iteration serves as a foundation for the more comprehensive system we're developing.
	</p>

	<h2>Technology Stack</h2>
	<p>
		This project is built using:
	</p>
	<ul>
		<li>SvelteKit for frontend and routing</li>
		<li>Mdsvex for rendering markdown content</li>
		<li>PostgreSQL database (hosted on Neon)</li>
		<li>Drizzle ORM for database operations</li>
		<li>Plain CSS for styling - We don't need any fancy Tailwind'ers!</li>
		<li>JavaScript with JSDoc comments - Keepin'it simple</li>
	</ul>

	<h2>Future Development</h2>
	<p>
		In upcoming versions, this application will evolve into a comprehensive employee information system with features such as:
	</p>
	<ul>
		<li>User authentication and role-based access</li>
		<li>Schedule management with supervisor identification</li>
		<li>Time logging and shift management</li>
		<li>Break handling functionality</li>
		<li>Detailed reports and various data views</li>
	</ul>

	<p>
		Our architecture emphasises modularity, security, and maintainability. Each component is designed to be
		reusable and the system allows for easy implementation of new features as requirements evolve.
	</p>
</div>

<style>
	:root {
		--primary: #3498db;
		--primary-dark: #2980b9;
		--secondary: #e74c3c;
		--text-dark: #2c3e50;
		--text-medium: #34495e;
		--text-light: #7f8c8d;
		--bg-light: #ecf0f1;
		--bg-white: #ffffff;
		--shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
		--radius: 12px;
		--transition: all 0.3s ease;
	}

	.about-container {
		max-width: 1100px;
		margin: 0 auto;
		padding: 2rem;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
		color: var(--text-dark);
		background: var(--bg-white);
		border-radius: var(--radius);
		box-shadow: var(--shadow);
	}

	.header-section {
		text-align: center;
		margin-bottom: 3rem;
		position: relative;
	}

	h1 {
		font-size: 3rem;
		margin-bottom: 1rem;
		color: var(--text-dark);
		font-weight: 800;
		letter-spacing: -0.5px;
	}

	.header-underline {
		height: 4px;
		width: 80px;
		background: linear-gradient(90deg, var(--primary), var(--secondary));
		margin: 0 auto;
		border-radius: 2px;
	}

	.content-section {
		margin-bottom: 3.5rem;
		position: relative;
		padding: 1.5rem;
		border-radius: var(--radius);
		background: var(--bg-white);
		transition: var(--transition);
	}

	.content-section:hover {
		transform: translateY(-5px);
		box-shadow: var(--shadow);
	}

	h2 {
		font-size: 1.8rem;
		margin-bottom: 1.2rem;
		color: var(--primary);
		font-weight: 700;
		display: inline-block;
		position: relative;
	}

	p {
		line-height: 1.8;
		margin-bottom: 1.5rem;
		color: var(--text-medium);
		font-size: 1.1rem;
	}

	a {
		color: var(--primary);
		text-decoration: none;
		font-weight: 500;
		position: relative;
		transition: var(--transition);
	}

	a::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 2px;
		bottom: -4px;
		left: 0;
		background-color: var(--primary);
		transform: scaleX(0);
		transform-origin: bottom right;
		transition: transform 0.3s ease;
	}

	a:hover {
		color: var(--primary-dark);
	}

	a:hover::after {
		transform: scaleX(1);
		transform-origin: bottom left;
	}

	.status-indicator {
		display: flex;
		margin-bottom: 1.5rem;
	}

	.status-badge {
		background: linear-gradient(135deg, var(--primary), var(--primary-dark));
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 50px;
		font-size: 0.9rem;
		font-weight: 600;
		display: inline-block;
		box-shadow: 0 4px 10px rgba(52, 152, 219, 0.3);
	}

	.tech-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
		gap: 1.5rem;
		margin-top: 2rem;
	}

	.tech-item {
		background: var(--bg-light);
		padding: 1.5rem;
		border-radius: var(--radius);
		text-align: center;
		transition: var(--transition);
	}

	.tech-item:hover {
		transform: translateY(-5px);
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
	}

	.tech-icon {
		font-size: 2rem;
		margin-bottom: 0.5rem;
	}

	.tech-name {
		font-weight: 700;
		margin-bottom: 0.3rem;
		color: var(--text-dark);
	}

	.tech-desc {
		font-size: 0.9rem;
		color: var(--text-light);
	}

	.features-list {
		margin-top: 1.5rem;
	}

	.feature-item {
		display: flex;
		align-items: center;
		padding: 1rem;
		margin-bottom: 1rem;
		background: var(--bg-light);
		border-radius: var(--radius);
		transition: var(--transition);
	}

	.feature-item:hover {
		transform: translateX(5px);
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
	}

	.feature-icon {
		font-size: 1.5rem;
		margin-right: 1rem;
	}

	.feature-text {
		font-weight: 500;
	}

	.architecture {
		background: linear-gradient(45deg, rgba(52, 152, 219, 0.05), rgba(231, 76, 60, 0.05));
		border-left: 4px solid var(--primary);
		padding: 2rem;
	}

	/* Responsive styles */
	@media (max-width: 1200px) {
		.about-container {
			max-width: 90%;
		}
	}

	@media (max-width: 900px) {
		.tech-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 768px) {
		.about-container {
			padding: 1.5rem;
			max-width: 100%;
			margin: 0;
			border-radius: 0;
			box-shadow: none;
		}

		h1 {
			font-size: 2.2rem;
		}

		h2 {
			font-size: 1.5rem;
		}

		.content-section {
			padding: 1.2rem;
			margin-bottom: 2rem;
		}

		.tech-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 1rem;
		}
	}

	@media (max-width: 480px) {
		.about-container {
			padding: 1rem;
		}

		h1 {
			font-size: 1.8rem;
		}

		.tech-grid {
			grid-template-columns: 1fr;
		}

		p {
			font-size: 1rem;
			line-height: 1.6;
		}

		.feature-item {
			padding: 0.8rem;
		}
	}
</style>