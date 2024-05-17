import successSound from "@/assets/sounds/success.mp3";

export default function notificationSound() {
   const audio = new Audio(successSound);
   audio.play();
}
