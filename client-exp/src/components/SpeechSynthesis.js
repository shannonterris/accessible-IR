// code adapted from https://codepen.io/matt-west/pen/wGzuJ?editors=1010
export default function speak(text, sender, id) {
  if (sender === id || id === "helperProfile") return; // Don't play text to speech on helper profile or own message
  // Create a new instance of SpeechSynthesisUtterance.
  var msg = new SpeechSynthesisUtterance();

  // Set the text.
  if (text) {
    msg.text = text;
  }

  // Can add customization here for the type of voice, speed, pitch etc.TODO

  // Queue this utterance.
  window.speechSynthesis.speak(msg);
}
