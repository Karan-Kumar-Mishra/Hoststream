export  default function get_url_with_domain(targetURL:string) {
   console.log(targetURL);
   
    let option={
        method :"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            targetURL:targetURL
        })
      }
    fetch("http://localhost:80/add_route",option).then((res)=>{
       return res.json();
    }).then((ans)=>{
       return ans;
    }).catch((err)=>{
        return err;
    })
}