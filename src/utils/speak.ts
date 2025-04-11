export function speak(text: string) {
    if (!('speechSynthesis' in window)) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-TW';

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
}
