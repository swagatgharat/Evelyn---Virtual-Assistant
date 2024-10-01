// Select the container for the talk button and the content display area
const btnContainer = document.querySelector('.talk-container');
const content = document.querySelector('.content');

// Function to use the SpeechSynthesis API to speak text
function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1; // Speech rate
    text_speak.volume = 1; // Volume level
    text_speak.pitch = 1; // Pitch level

    window.speechSynthesis.speak(text_speak); // Speak the text
}

// Speak an initialization message when the page loads
window.addEventListener('load', () => {
    speak("Initializing JARVIS...");
});

// Initialize the SpeechRecognition API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Handle the result from the SpeechRecognition API
recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript; // Get the recognized speech
    content.textContent = transcript; // Display the transcript
    takeCommand(transcript.toLowerCase()); // Process the transcript
};

// Start speech recognition when the talk button is clicked
btnContainer.addEventListener('click', () => {
    content.textContent = "Listening..."; // Update content to indicate listening state
    recognition.start(); // Start recognizing speech
});

// Show a message prompting to speak again after 2 seconds
function showSpeakAgainMessage() {
    setTimeout(() => {
        content.textContent = "Click here to speak";
    }, 2000);
}

// Capitalize the first letter of each word in a text
function capitalizeFirstLetterOfEachWord(text) {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
}

// Process commands based on recognized speech
function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
        content.textContent = capitalizeFirstLetterOfEachWord(message);
        showSpeakAgainMessage();
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
        content.textContent = capitalizeFirstLetterOfEachWord(message);
        showSpeakAgainMessage();
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
        content.textContent = capitalizeFirstLetterOfEachWord(message);
        showSpeakAgainMessage();
    } else if (message.includes("open instagram")) {
        window.open("https://www.instagram.com/", "_blank");
        speak("Opening Instagram...");
        content.textContent = capitalizeFirstLetterOfEachWord(message);
        showSpeakAgainMessage();
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
        content.textContent = capitalizeFirstLetterOfEachWord(message);
        showSpeakAgainMessage();
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
        content.textContent = capitalizeFirstLetterOfEachWord(message);
        showSpeakAgainMessage();
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
        content.textContent = capitalizeFirstLetterOfEachWord(message);
        showSpeakAgainMessage();
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
        content.textContent = capitalizeFirstLetterOfEachWord("current time: " + time);
        showSpeakAgainMessage();
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
        content.textContent = capitalizeFirstLetterOfEachWord("today's date: " + date);
        showSpeakAgainMessage();
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        const finalText = "Opening Calculator";
        speak(finalText);
        content.textContent = capitalizeFirstLetterOfEachWord("opening calculator");
        showSpeakAgainMessage();
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
        content.textContent = capitalizeFirstLetterOfEachWord(message);
        showSpeakAgainMessage();
    }
}
