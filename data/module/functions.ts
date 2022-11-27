export default {
    fetch: function (type: "system", body: string, onRes?: (res: any) => void) {
        fetch("api/" + type, {
            method: "POST",
            body: body
        }).then(
            async res => {
                if (onRes) {
                    onRes(await res.json())
                }
            }
        )
    }
}