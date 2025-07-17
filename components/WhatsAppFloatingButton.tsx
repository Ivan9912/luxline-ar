import React from 'react';

interface WhatsAppFloatingButtonProps {
  /** Número de WhatsApp en formato internacional sin signos (ej. 5491123188568) */
  phoneNumber?: string;
  /** Mensaje predeterminado que aparecerá en la conversación */
  message?: string;
}

const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  phoneNumber = '5491123188568',
  message = 'Hola Luxline. Quiero...'
}) => {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 lg:bottom-10 lg:right-10"
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white"
        >
          <path
            fill="currentColor"
            d="M20.52 3.48A11.85 11.85 0 0 0 12.01.15C6.16.15 1.35 4.96 1.35 10.81c0 1.92.5 3.78 1.44 5.44L.15 23.85l7.8-2.04a10.67 10.67 0 0 0 4.05.77h.01c5.86 0 10.67-4.81 10.67-10.67 0-2.85-1.11-5.54-3.16-7.43Zm-8.5 17.26h-.01a9.23 9.23 0 0 1-4.68-1.27l-.33-.2-4.63 1.21 1.22-4.51-.21-.37a9.26 9.26 0 0 1-1.42-4.87c0-5.14 4.18-9.32 9.32-9.32 2.49 0 4.83.97 6.59 2.73a9.24 9.24 0 0 1 2.73 6.59c0 5.14-4.18 9.32-9.32 9.32Zm5.19-6.75c-.28-.14-1.64-.81-1.89-.9-.25-.1-.43-.14-.61.14s-.7.9-.86 1.08c-.16.18-.31.2-.6.07a7.78 7.78 0 0 1-2.28-1.4 8.57 8.57 0 0 1-1.57-1.95c-.16-.27-.02-.42.12-.56.12-.12.28-.31.42-.46.14-.16.19-.27.28-.46.1-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.52-.45-.45-.62-.46h-.53c-.18 0-.48.07-.73.34s-.95.93-.95 2.26c0 1.32.97 2.61 1.11 2.79.14.18 1.92 2.94 4.65 4.12.65.28 1.16.45 1.56.58.66.21 1.27.18 1.75.11.53-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.31Z"
          />
        </svg>
      </div>
    </a>
  );
};

export default WhatsAppFloatingButton;
