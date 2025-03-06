<!-- src/routes/+page.svelte -->
<script>
    import { onMount } from 'svelte';
    import { fade, fly, scale } from 'svelte/transition';
    import { elasticOut, quintOut } from 'svelte/easing';

    /**
     * State for managing form inputs and calculation results
     */
    let startTime = '';
    let endTime = '';
    let totalDecimalHours = 0;
    let totalHoursDisplay = '';
    let isDarkMode = false;
    let isCalculated = false;
    let isFormValid = false;

    /**
     * Converts time to a decimal value
     * @param {string} time - Time in HH:MM format
     * @returns {number} - Time as decimal hours
     */
    function timeToDecimal(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours + minutes / 60;
    }

    /**
     * Rounds time to the nearest 15 minutes as specified in requirements
     * @param {number} decimalTime - Time in decimal format
     * @returns {number} - Rounded time
     */
    function roundToNearest15Min(decimalTime) {
        const hourPart = Math.floor(decimalTime);
        const minutePart = decimalTime - hourPart;
        const minutesInDecimal = minutePart * 60;

        // Round to nearest 15 minutes
        const roundedMinutes = Math.round(minutesInDecimal / 15) * 15;

        // Convert back to decimal
        return hourPart + (roundedMinutes / 60);
    }

    /**
     * Calculates the total hours worked based on start and end times
     */
    function calculateHours() {
        if (!startTime || !endTime) return;

        // Convert times to decimal
        const startDecimal = timeToDecimal(startTime);
        const endDecimal = timeToDecimal(endTime);

        // Calculate duration (handle overnight shifts)
        let duration = endDecimal >= startDecimal
            ? endDecimal - startDecimal
            : (24 - startDecimal) + endDecimal;

        // Round both start and end times
        const roundedStart = roundToNearest15Min(startDecimal);
        const roundedEnd = roundToNearest15Min(endDecimal);

        // Calculate rounded duration
        let roundedDuration = roundedEnd >= roundedStart
            ? roundedEnd - roundedStart
            : (24 - roundedStart) + roundedEnd;

        // Format for display
        totalDecimalHours = roundedDuration;
        const hours = Math.floor(roundedDuration);
        const minutes = Math.round((roundedDuration - hours) * 60);
        totalHoursDisplay = `${hours}h ${minutes}m`;

        isCalculated = true;
    }

    /**
     * Toggles between dark and light mode
     */
    function toggleDarkMode() {
        isDarkMode = !isDarkMode;
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }

    /**
     * Validates the form input
     */
    function validateForm() {
        isFormValid = startTime && endTime;
    }

    /**
     * Set up initial state when component mounts
     */
    onMount(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        }
    });
</script>

<svelte:head>
    <title>Work Hours Calculator</title>
</svelte:head>

<div class="container {isDarkMode ? 'dark-mode' : 'light-mode'}">
<!--    <div class="theme-toggle">-->
<!--        <button on:click={toggleDarkMode} aria-label="Toggle theme">-->
<!--            {#if isDarkMode}-->
<!--                <span class="icon">☀️</span>-->
<!--            {:else}-->
<!--                <span class="icon">🌙</span>-->
<!--            {/if}-->
<!--        </button>-->
<!--    </div>-->

    <header class="header">
        <h1 class="title">Work Hours Calculator</h1>
        <p class="subtitle">Enter your shift times to calculate total hours</p>
    </header>

    <div class="card" in:fly={{ y: 20, duration: 800, easing: quintOut }}>
        <form on:submit|preventDefault={calculateHours} class="form">
            <div class="form-group" in:fly={{ y: 20, duration: 500, delay: 200 }}>
                <label for="start-time">Start Time</label>
                <input
                        type="time"
                        id="start-time"
                        bind:value={startTime}
                        on:input={validateForm}
                        required
                />
            </div>

            <div class="form-group" in:fly={{ y: 20, duration: 500, delay: 300 }}>
                <label for="end-time">End Time</label>
                <input
                        type="time"
                        id="end-time"
                        bind:value={endTime}
                        on:input={validateForm}
                        required
                />
            </div>

            <button
                    type="submit"
                    class="button"
                    disabled={!isFormValid}
                    in:fly={{ y: 20, duration: 500, delay: 400 }}
            >
                Calculate Hours
            </button>
        </form>

        {#if isCalculated}
            <div class="result" in:scale={{duration: 400, start: 0.8, opacity: 0, easing: elasticOut}}>
                <h2 in:fly={{ y: -10, duration: 300, delay: 200 }}>Total Hours</h2>
                <div class="result-display">
                    <span class="hours" in:scale={{duration: 600, delay: 300, start: 0.5, easing: elasticOut}}>{totalHoursDisplay}</span>
                    <span class="decimal" in:fade={{duration: 300, delay: 800}}>({totalDecimalHours.toFixed(2)} decimal hours)</span>
                </div>
                <p class="note" in:fade={{duration: 300, delay: 1000}}>Time rounded to nearest 15 minutes</p>
            </div>
        {/if}
    </div>

    <footer class="credits" in:fade={{duration: 1000, delay: 1500}}>
        Made by <a href="https://github.com/MateuszPodeszwa" target="_blank" rel="noopener noreferrer">Mateusz Podeszwa</a>
    </footer>
</div>

<style>
    /* Global styles */
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        transition: background-color 0.3s ease, color 0.3s ease;
        min-height: 100vh;
    }

    :global(body.dark-mode) {
        background-color: #121212;
        color: #f5f5f5;
    }

    /* Container */
    .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 2rem 1rem;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .dark-mode {
        color: #f5f5f5;
    }

    .light-mode {
        color: #333;
    }

    /* Header */
    .header {
        text-align: center;
        margin-bottom: 2rem;
        animation: fadeIn 0.8s ease-in-out;
    }

    .title {
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
        font-weight: 700;
        background: linear-gradient(270deg, #3a7bd5, #00d2ff, #3a7bd5, #6fbbd5);
        background-size: 300% 100%;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        transition: all 0.3s ease;
        animation: gradientFlow 8s ease infinite;
    }

    @keyframes gradientFlow {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    .subtitle {
        font-size: 1.1rem;
        opacity: 0.8;
        margin-top: 0;
    }

    /* Theme toggle */
    .theme-toggle {
        position: absolute;
        top: 1rem;
        right: 1rem;
    }

    .theme-toggle button {
        background: transparent;
        border: none;
        cursor: pointer;
        font-size: 1.5rem;
        padding: 0.5rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s ease;
    }

    .theme-toggle button:hover {
        transform: rotate(15deg);
    }

    .icon {
        font-size: 1.5rem;
    }

    /* Card */
    .card {
        background-color: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        border-radius: 16px;
        padding: 2rem;
        width: 100%;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.1);
        animation: slideUp 0.5s ease-out;
        transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    }

    .dark-mode .card {
        background-color: rgba(30, 30, 30, 0.8);
    }

    .light-mode .card {
        background-color: rgba(255, 255, 255, 0.8);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    /* Form */
    .form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    label {
        font-weight: 500;
        font-size: 1rem;
    }

    input {
        padding: 1rem;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background-color: rgba(255, 255, 255, 0.05);
        color: inherit;
        font-size: 1rem;
        transition: all 0.3s ease;
    }

    .dark-mode input {
        background-color: rgba(0, 0, 0, 0.2);
    }

    .light-mode input {
        background-color: rgba(255, 255, 255, 0.8);
        border: 1px solid rgba(0, 0, 0, 0.1);
        color: #333;
    }

    input:focus {
        outline: none;
        border-color: #3a7bd5;
        box-shadow: 0 0 0 2px rgba(58, 123, 213, 0.3);
    }

    /* Button */
    .button {
        background: linear-gradient(90deg, #3a7bd5, #00d2ff);
        color: white;
        border: none;
        padding: 1rem;
        border-radius: 8px;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        transform: translateY(0);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .button:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    }

    .button:active:not(:disabled) {
        transform: translateY(0);
    }

    .button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        background: linear-gradient(90deg, #888, #aaa);
    }

    /* Result */
    .result {
        margin-top: 2rem;
        padding-top: 1rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        text-align: center;
        animation: expand 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    }

    .light-mode .result {
        border-top: 1px solid rgba(0, 0, 0, 0.1);
    }

    .result h2 {
        font-size: 1.3rem;
        margin-bottom: 1rem;
    }

    .result-display {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }

    .hours {
        font-size: 2.5rem;
        font-weight: 700;
        color: #00d2ff;
        text-shadow: 0 0 10px rgba(0, 210, 255, 0.3);
    }

    .decimal {
        font-size: 1rem;
        opacity: 0.8;
    }

    .note {
        margin-top: 1rem;
        font-size: 0.9rem;
        opacity: 0.7;
        font-style: italic;
    }

    /* Animations */
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes slideUp {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes expand {
        from {
            opacity: 0;
            transform: scaleY(0.8);
            transform-origin: top center;
        }
        to {
            opacity: 1;
            transform: scaleY(1);
            transform-origin: top center;
        }
    }

    /* Credits */
    .credits {
        margin-top: 2rem;
        font-size: 0.9rem;
        opacity: 0.7;
        text-align: center;
        animation: fadeIn 1.5s ease-in-out;
        animation-delay: 1.2s;
        animation-fill-mode: both;
    }

    .credits a {
        color: #00d2ff;
        text-decoration: none;
        transition: all 0.3s ease;
    }

    .credits a:hover {
        color: #3a7bd5;
        text-shadow: 0 0 8px rgba(58, 123, 213, 0.3);
    }

    /* Responsive design */
    @media (max-width: 768px) {
        .container {
            padding: 1rem;
        }

        .title {
            font-size: 2rem;
        }

        .card {
            padding: 1.5rem;
        }

        .hours {
            font-size: 2rem;
        }
    }

    @media (max-width: 480px) {
        .card {
            padding: 1.2rem;
        }

        .title {
            font-size: 1.8rem;
        }

        .subtitle {
            font-size: 1rem;
        }

        input {
            padding: 0.8rem;
        }

        .button {
            padding: 0.8rem;
        }
    }
</style>