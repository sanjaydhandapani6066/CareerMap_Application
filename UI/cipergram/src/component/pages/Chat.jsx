import React from "react";
import '../../assets/css/Chat.css';

const Chat = ()=>{
    return(
        <>
        <div className="chat-body">
           <header className="header">
            <h2 className="title">Hello, there</h2>
            <h4 className="subtitle">How may I help you with Documents today?</h4>

            <ul className="suggestion-list">
                <li className="suggestion">
                    <h4 className="text">
                        Summarize the document and give me the key points.
                    </h4>
                    <i class="ri-edit-box-line"></i>
                </li>
                <li className="suggestion">
                    <h4 className="text">
                        Summarize the document and give me the key points.
                    </h4>
                    <i class="ri-edit-box-line"></i>
                </li>
                <li className="suggestion">
                    <h4 className="text">
                        Summarize the document and give me the key points.
                    </h4>
                    <i class="ri-edit-box-line"></i>
                </li>
                 <li className="suggestion">
                    <h4 className="text">
                        Summarize the document and give me the key points.
                    </h4>
                    <i class="ri-edit-box-line"></i>
                </li>
            </ul>
            </header>

            <div className="typing-area">
                <form action="#" className="typing-form">
                    <div className="input-wrapper">
                        <input type="text" placeholder="Enter a prompt here" className="typing-input" required/>
                        <i class="icon ri-send-plane-fill"></i>
                        <button className="input-upload-btn"> <i class="file-icon ri-file-add-line"></i></button>
                    </div>
                </form>
                <p className="disclaimer-text">
                    Claritext may display inaccurate info,please double-check its responses.
                </p>
            </div>
        </div>



        </>
    );
}

export default Chat;