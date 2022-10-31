// import React, { useState } from 'react'

// //In React components, if we want to use an image as part of the UI, we must first import the image into the file.
// //Below, we import an image and give it a name to easily refer to it in the src for an img tag.
// import logo from '../images/logo192.png'

//  export default function Header(props) {
//     //Below we add a hook to manage opening/closing the menu
//     const [toggleNav, setToggleNav] = useState(false);

//     const handleContentChange = (content) => {
//         //Below, we use the setShowContent function to communicate (call) back to the App component asking for specific
//         //content the user wants to see.
//         props.setShowContent(content)
//         //Next we write JS code that will close the navigation menu and scroll to the top of the page.
//         setToggleNav(false)
//         window.scrollTo({ top: 0, behavior: 'smooth' })
//     }

//     return (
//         <header>
//             <nav className='navbar navbar-expand-lg'>
//                 <button onClick={() => handleContentChange('Home')} className='navbar-brand'>
//                     To-Dos
//                     <img src={logo} alt='React Logo' />
//                 </button>

//                 {/* Below is a hamburger button to show/hide our menu */}
//                 <button className='menuToggle' onClick={() => setToggleNav(true)}>
//                     <div className='hamburger-outer'>
//                         <div className="hamburger-inner"></div>
//                         <div className="hamburger-inner"></div>
//                         <div className="hamburger-inner"></div>
//                     </div>
//                 </button>

//                 {toggleNav && (
//                     <div className='menu'>
//                         <button className='close-menu' onClick={() => setToggleNav(false)}>
//                             &times;
//                         </button>
//                         {/* Below we create each link, passing in a specific value to handleContent to  manipulate what components render in the UI. */}
//                         <ul>
//                             <li onClick={()=> handleContentChange('Home')}>Home</li>
//                             <li onClick={()=> handleContentChange('login')}>About</li>                            
//                             <li onClick={()=> handleContentChange('categories')}>Categories</li>                            
//                             <li onClick={()=> handleContentChange('toDos')}>ToDos</li>                            
//                             <li onClick={()=> handleContentChange('routing')}>Routing</li>                            
//                         </ul>
//                     </div>                    
//                 )}
//             </nav>
//         </header>
//     )
//  }