import React, { useEffect, useState } from "react";
import styles from "../pages/SetsPage.module.css";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function SetsPage() {
  const { id } = useParams();
  const navigate = useNavigate();


  return (
    <></>
  )

}

export default SetsPage;