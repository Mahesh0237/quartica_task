import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TaskDetails from './components/TaskDetails'
import Tasklistpage from './pages/Tasklistpage'
function Approuter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element = {<Tasklistpage/>} />
                <Route path="/task/:id" element={<TaskDetails/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Approuter