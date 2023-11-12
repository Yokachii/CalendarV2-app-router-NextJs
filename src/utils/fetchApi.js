export default async function fetchApi(params,method,body){

    let requestParams

    body? requestParams={
        method,
        headers: {
        'Content-Type': 'application/json',
        },
        body:JSON.stringify(body),
    } : requestParams={
        method,
        headers: {
        'Content-Type': 'application/json',
        },
    }

    const response = await fetch(`http://localhost:3000/${params}`,requestParams);
    
    let json = await response.json();
    let status = response.status.toString()
    return {status,json}

}