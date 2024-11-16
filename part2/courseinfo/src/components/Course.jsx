import Header from "./Header"
import Content from "./Content"
import Total from "./Total"
const Course = (props) => {
    return (
        <div>
            {props.courses.map((course, i) => 
            <div key={i}>
             <Header name={course.name} />    
             <Content parts={course.parts} />
             <Total parts={course.parts} />
            </div>
            )}
       
        </div>
    )
} 
export default Course