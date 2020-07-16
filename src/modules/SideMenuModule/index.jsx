import React, { Component } from 'react'
import Defendant from './defendant'

export class index extends Component {
    render() {
        return (
            <>
                <h3>side menu</h3>
                <Defendant />
                <br />
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">標註資訊</div>
                        <div className="card-text">
                            <button>單位</button>
                            <button>職稱</button>
                            <button>身份</button>
                            <button>法條</button>
                            <hr />
                            <div>
                                單位
                    <ul>
                                    <li>單位1</li>
                                    <li>單位2</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default index
