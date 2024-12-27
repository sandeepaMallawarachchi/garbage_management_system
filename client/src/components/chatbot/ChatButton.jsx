import React, { useState } from 'react'
import ChatBot from './ChatBot';
import bot from '../../images/bot.png';

const ChatButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div className='fixed bottom-10 right-10 z-50'>
            <img src={bot} onClick={handleOpenModal} className='w-20 cursor-pointer' />
            {isModalOpen && <ChatBot onClose={handleCloseModal} />}
        </div>
    )
}

export default ChatButton