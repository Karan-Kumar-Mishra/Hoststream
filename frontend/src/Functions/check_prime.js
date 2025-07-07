export const check_prime = (user_id) => {
    return async () => {
        try {

            let option = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: user_id,
                })
            }
            let a = await fetch(import.meta.env.VITE_BACKEND_URL+ '/checkprime', option);
            let res = await a.json()
           
            if (res.status === "ok") {
                return res.ans;
            }
            else
            {
                return false
            }
        } catch (error) {
            console.error("Error stoping vms:", error);
        }
    };
};