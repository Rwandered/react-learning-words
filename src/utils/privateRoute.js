import React from 'react'
import {Route, Redirect} from 'react-router-dom'


export const PrivateRoute = ( {component: Component, ...rest} ) => (
    <Route
      {...rest}

      render={ props => localStorage.getItem('user')
        ? (
          <>
            <Component {...props}/>
          </>
        )
        : (
          <>
            <Redirect to={'/auth'}/>
          </>
        )
      }
    />
  )



// <Route
//   {...rest}
//
//   render={ props => localStorage.getItem('user')
//     ? (
//       <>
//         <Component {...props}/>
//         <Redirect to={'/'}/>
//       </>
//     )
//     : <Redirect to={'/auth'}/>
//   }
// />