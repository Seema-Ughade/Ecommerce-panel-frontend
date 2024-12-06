import React from 'react';

const RecentProducts = () => {
    return (
        <div className="row row-cards-one">
            <div className="col-12">
                <div className="card">
                    <h5 className="card-header">Recent Product(s)</h5>
                    <div className="card-body">
                        <div className="table-responsive dashboard-home-table">
                            <div id="pproducts_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                                <div className="row btn-area">
                                    <div className="col-sm-4"></div>
                                    <div className="col-sm-4"></div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <table
                                            id="pproducts"
                                            className="table table-hover dt-responsive dataTable no-footer dtr-inline"
                                            cellSpacing="0"
                                            width="100%"
                                            role="grid"
                                        >
                                            <thead>
                                                <tr role="row">
                                                    <th className="sorting_disabled" rowSpan="1" colSpan="1">
                                                        Featured Image
                                                    </th>
                                                    <th className="sorting_disabled" rowSpan="1" colSpan="1">
                                                        Name
                                                    </th>
                                                    <th className="sorting_disabled" rowSpan="1" colSpan="1">
                                                        Category
                                                    </th>
                                                    <th className="sorting_disabled" rowSpan="1" colSpan="1">
                                                        Type
                                                    </th>
                                                    <th className="sorting_disabled" rowSpan="1" colSpan="1" style={{}}>
                                                        Price
                                                    </th>
                                                    <th className="sorting_disabled" rowSpan="1" colSpan="1" style={{}}></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* Example of a product row */}
                                                <tr role="row" className="odd" >
                                                    <td>
                                                        <img 
                                                            src="https://via.placeholder.com/100" // Placeholder image
                                                            alt="Product" 
                                                            className="img-fluid"
                                                            style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                                                        />
                                                    </td>
                                                    <td>Sample Product</td>
                                                    <td>
                                                        Home Decor
                                                        <br />
                                                        Wall Art
                                                    </td>
                                                    <td>Physical</td>
                                                    <td>20$</td>
                                                    <td>
                                                        <div className="action-list">
                                                            <a href="/admin/products/edit/1">
                                                                <i className="fas fa-eye"></i> Details
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {/* Repeat or add more product rows */}
                                                <tr role="row" className=" text-center even">
                                                    <td>
                                                        <img 
                                                            src="https://via.placeholder.com/100" // Placeholder image
                                                            alt="Product" 
                                                            className="img-fluid"
                                                            style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                                                        />
                                                    </td>
                                                    <td>Another Product</td>
                                                    <td>
                                                        Office Supplies
                                                    </td>
                                                    <td>Digital</td>
                                                    <td>15$</td>
                                                    <td>
                                                        <div className="action-list">
                                                            <a href="/admin/products/edit/2">
                                                                <i className="fas fa-eye"></i> Details
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-5"></div>
                                    <div className="col-12 col-md-7"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentProducts;
