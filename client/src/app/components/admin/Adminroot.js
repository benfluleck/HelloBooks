import React from 'react'
import {NavLink} from 'react-router-dom'
import {
		Input,
		CollectionItem,
		Collection,
		Collapsible,
		CollapsibleItem,
		Col,
		Tabs,
		Tab
} from 'react-materialize'

/*
eslint-disable
 */
export class Adminroot extends React.Component {
		render() {
				return (

						<div className="admintab">
								<Tabs className='tab-demo z-depth-1 transparent'>
										<Tab title="Books" active>
												<Collection>
														<CollectionItem>
																<NavLink to='/admin/createbook'>Create Book
																</NavLink>
														</CollectionItem>
														<CollectionItem>
																<NavLink to='/admin/editbook'>Edit Book
																</NavLink>
														</CollectionItem>
														<CollectionItem>
																<NavLink to='/admin/viewbook'>View Books</NavLink>
														</CollectionItem>

												</Collection>
										</Tab>
										<Tab title="Users & Groups">
												<Collection>
														<CollectionItem>
																<NavLink to='/admin/edituser'>Edit User
																</NavLink>
														</CollectionItem>
														<CollectionItem>
																<NavLink to='/admin/userlist'>View list of users</NavLink>
														</CollectionItem>
												</Collection>
										</Tab>

								</Tabs>
						</div>

				);
		}
}
