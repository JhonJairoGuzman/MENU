const countdownDate = new Date("January 29, 2025 00:00:00").getTime();

const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = `${days}d`;
    document.getElementById("hours").innerHTML = `${hours}h`;
    document.getElementById("minutes").innerHTML = `${minutes}m`;
    document.getElementById("seconds").innerHTML = `${seconds}s`;

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("timer").innerHTML = "¡Lanzamiento!";
    }
}, 1000);