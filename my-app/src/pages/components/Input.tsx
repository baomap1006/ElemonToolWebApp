import React,{FormEvent, useState} from 'react'

// type Props = {}

const MyComponent:React.FC = ()=>{
    const [userId, setuserId] = useState<string>("")
    const submitEvent = (e:FormEvent)=>{
        e.preventDefault();
        console.log(userId)
    }
    return (
        <div className='flex'>
            <form className='flex m-4' action="" onSubmit ={submitEvent}>
                <input type="text" value={userId} onChange ={(e)=>{
                    setuserId(e.target.value)
                }}/>
                <button type='submit'>Submit</button>
                <button onClick={(e)=>setuserId("")}>clear</button>
            </form>
           
        </div>
    )
}

export default MyComponent