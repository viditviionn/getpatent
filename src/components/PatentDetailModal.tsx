import { Modal } from "@mui/material";
import React, { useState } from "react";

export const PatentDetailModal = (props: any) => {
    const { handleCloseModal, selectedPatents, open }: any = props
    const handlePatentClick = (url: string) => {
        window.open(url, '_blank'); // Opens the link in a new tab
    };
    return (
        <Modal open={open} onClose={() => handleCloseModal()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', minWidth: "1000px" }}>
                <h2>Patent Details</h2>
                <ul>
                    {selectedPatents.map((patent: any, index: any) => (
                        <li key={index} style={{ margin: '10px 0' }}>
                            <a
                                href="#"
                                onClick={() => handlePatentClick(patent.www_link)}
                                style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                            >
                                {patent.title} - {patent.publication_date}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </Modal>
    )
}