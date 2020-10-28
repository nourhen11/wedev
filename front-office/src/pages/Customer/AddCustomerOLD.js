import React, {Component} from 'react'
import Button from '../../component/Button';
import Tree from '../../component/Tree';


export default class AddCustomer extends Component {
    render() {
        return (
            <div>
                <div className="container-fluid">
                    <Tree label={"Ajouter Client"} href={"../pages/Home.js"}/>

                </div>

                <div className="row">
                    <div className="col-lg col-md col-sm">
                        <div className="card">
                            <h5 className="card-header">Ajouter client</h5>
                            <div className="card-body">
                                <form className="needs-validation" noValidate>
                                    <div className="row">
                                        <div className="col-lg col-md col-sm ">
                                            <label htmlFor="validationCustom01">Nom</label>
                                            <input type="text" className="form-control" id="validationCustom01"
                                                   placeholder="First name" defaultValue="Nom" required/>

                                        </div>
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                                            <label htmlFor="validationCustom02">Prénom</label>
                                            <input type="text" className="form-control" id="validationCustom02"
                                                   placeholder="Last name" defaultValue="Prénom" required/>

                                        </div>
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                                            <label htmlFor="validationCustom02">Email</label>
                                            <input type="email" className="form-control" id="validationCustom02"
                                                   placeholder="Last name" defaultValue="Otto" required/>
                                            <div className="valid-feedback">
                                                Looks good!
                                            </div>
                                        </div>
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                                            <label htmlFor="validationCustom02">Téléphone</label>
                                            <input type="tel" className="form-control" id="validationCustom02"
                                                   placeholder="Last name" defaultValue="téléphone" required/>

                                        </div>
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                                            <label htmlFor="validationCustom02">Dénomination sociale</label>
                                            <input type="text" className="form-control" id="validationCustom02"
                                                   placeholder="Last name" defaultValue="Dénomination sociale"
                                                   required/>

                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                                            <label htmlFor="validationCustom03">City</label>
                                            <input type="text" className="form-control" id="validationCustom03"
                                                   placeholder="City" required/>
                                            <div className="invalid-feedback">
                                                Please provide a valid city.
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                                            <label htmlFor="validationCustom04">State</label>
                                            <input type="text" className="form-control" id="validationCustom04"
                                                   placeholder="State" required/>
                                            <div className="invalid-feedback">
                                                Please provide a valid state.
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                                            <label htmlFor="validationCustom05">Zip</label>
                                            <input type="text" className="form-control" id="validationCustom05"
                                                   placeholder="Zip" required/>
                                            <div className="invalid-feedback">
                                                Please provide a valid zip.
                                            </div>
                                        </div>
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="form-group">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" defaultValue
                                                           id="invalidCheck" required/>
                                                    <label className="form-check-label" htmlFor="invalidCheck">
                                                        Agree to terms and conditions
                                                    </label>
                                                    <div className="invalid-feedback">
                                                        You must agree before submitting.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                                            <Button type={"submit"} color={"primary"} label={"Ajouter"} onClick=""/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
