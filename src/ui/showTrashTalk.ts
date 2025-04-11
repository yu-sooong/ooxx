export function showTrashTalk(text: string) {
    const talk = document.getElementById('talk')!;
    const talkText = document.getElementById('talk-text')!;
    talkText.textContent = text;

    talk.classList.remove('hidden', 'animate-fade-out');
    talk.classList.add('animate-fade-in');
    clearTimeout((talk as any)._fadeOutTimer);
    (talk as any)._fadeOutTimer = setTimeout(() => {
        talk.classList.remove('animate-fade-in');
        talk.classList.add('animate-fade-out');
        setTimeout(() => talk.classList.add('hidden'), 400);
    }, 500);
}
