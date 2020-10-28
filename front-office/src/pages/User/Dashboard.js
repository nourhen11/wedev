import React, { Component } from 'react';

class Dashboard extends Component {
    render() {
        return (
            <div className="mt-40">
                <h1>Dashboard page</h1>
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-3">
                        <div className="info-box mb-3">
                            <span className="info-box-icon bg-danger elevation-1"><i
                                className="fas fa-thumbs-up"/></span>
                            <div className="info-box-content">
                                <span className="info-box-text">Liste des clients</span>
                                <span className="info-box-number">41,410</span>
                            </div>
                        </div>
                    </div>
                    <div className="clearfix hidden-md-up"/>
                    <div className="col-12 col-sm-6 col-md-3">
                        <div className="info-box mb-3">
                            <span className="info-box-icon bg-success elevation-1"><i className="fas fa-shopping-cart"/></span>
                            <div className="info-box-content">
                                <span className="info-box-text">Nombre des projets</span>
                                <span className="info-box-number">760</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3">
                        <div className="info-box mb-3">
                            <span className="info-box-icon bg-warning elevation-1"><i className="fas fa-users"/></span>
                            <div className="info-box-content">
                                <span className="info-box-text">Nouveau projets</span>
                                <span className="info-box-number">2,000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;