import { useState , useCallback,useEffect,useRef } from "react"



function App() {
 

  const [ length,setLength] = useState(8) ;
  const [ number , setNumber]  = useState(false)
  const [ character , setChar]  = useState(false)
  const [password,setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
  
  let pass = "";
  let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  if(number){

    str+="1234567890"
  }
  if(character){

    str+="!@#$%^&*-_+=[]{}~`"
  }
  for(let i=0;i<length;i++){

    let char = Math.floor(Math.random()*str.length+1);
    pass += str.charAt(char)
  }

  setPassword(pass)

}, [length,  number, character,  setPassword])

 useEffect (()=>{

  passwordGenerator()
 },[length,  number, character,setPassword])

 const reference = useRef(null); // useref ko hum ek variable mai store karte hai 
 function copyClipboard (){

window.navigator.clipboard.writeText(password);
reference.current?.select() ;
 }

 

  return (
    
     
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
    <h1 className='text-white text-center my-3'>Password generator</h1>
  <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input
          type="text"
           value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
        ref={reference}
      />
      <button
        onClick={copyClipboard}
      className='outline-none bg-blue-700 hover:bg-sky-800 text-white px-3 py-0.5 shrink-0'
      >copy</button>
      
  </div>
  <div className='flex text-sm gap-x-2'>
    <div className='flex items-center gap-x-1'>
      <input 
      type="range"
      min={8}
      max={100}
        value={length}
       className='cursor-pointer'
       onChange={(e)=>{
       setLength(e.target.value) // set length function ke andhar value pass kar do 
       }}
      
        />
        <label>Length:{length}</label>
    </div>
    <div className="flex items-center gap-x-1">
    <input
        type="checkbox"
         defaultChecked={number}
        id="numberInput"
        onChange={()=>{
          setNumber(preVal=> !preVal)
        }}
        
    />
    <label htmlFor="numberInput">Numbers</label>
    </div>
    <div className="flex items-center gap-x-1">
        <input
            type="checkbox"
             defaultChecked={character}
            id="characterInput"
             onChange={()=>{

              setChar(prevChar=>!prevChar)
             }}
          
        />
        <label htmlFor="characterInput">Characters</label>
    </div>
  </div>
</div>
     
    
  )
}

export default App
