import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import './App.css';

export default function Nav() {
    const [onClick1, setOnClick1] = useState(false);
    const [onClick2, setOnClick2] = useState(false);
    const [addClassName, setAddClassName] = useState("0");

    const handleNavClick = (index) => {
        setAddClassName(index)
        localStorage.setItem('addClassName', index);
    }

    useEffect(() => {
        const savedIndex = localStorage.getItem('addClassName');
        if (savedIndex !== null) {
            setAddClassName(parseInt(savedIndex));
        }
    }, []);

    const handleOnClick1 = (event) => {
        event.preventDefault();
        setOnClick1(!onClick1);
    }

    const handleOnClick2 = (event) => {
        event.preventDefault();
        setOnClick2(!onClick2);
    }

    return (
        <div className="nav">
            <input type="text" placeholder="Tìm kiếm" />
            <div className="div-1" onClick={handleOnClick1}>Hệ thống {onClick1 ? <ChevronUp /> : <ChevronDown />}</div>
            {
                onClick1 ?
                    <div className="div-2">
                        <div className={addClassName === 0 ? "color" : ""} onClick={() => handleNavClick(0)}>Công việc đang xử lý</div>
                        <div className={addClassName === 1 ? "color" : ""} onClick={() => handleNavClick(1)}>Quá trình duyệt</div>
                        <div className={addClassName === 2 ? "color" : ""} onClick={() => handleNavClick(2)}>Loại tài liệu</div>
                        <div className={addClassName === 3 ? "color" : ""} onClick={() => handleNavClick(3)}>Số hồ sơ</div>
                    </div>
                    :
                    <></>
            }
            <div className="div-1" onClick={handleOnClick2}>Thiết lập hệ thống {onClick2 ? <ChevronUp /> : <ChevronDown />}</div>
            {
                onClick2 ?
                    <div className={addClassName === 4 ? "color div-3" : "div-3"} onClick={() => handleNavClick(4)}>Thiết lập bảng giá cơ bản</div>
                    :
                    <></>
            }
        </div>
    )
}