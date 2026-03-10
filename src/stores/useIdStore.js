import { create } from "zustand";

const useIdStore = create((set)=>({
    id:0,
    setId:(id)=>set({id:id}), 
    resetId: ()=>set({id:0})
}))

export default useIdStore