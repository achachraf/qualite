
function produceCombinations( arr,data,start,end,index,r,results)  { 
    if (index == r) {  
        let comb = [];
        for (let j = 0; j < r; j++){
            comb.push(data[j]);
        }
        //results =  results || [[]];
        results.push(comb);
        return;  
    }  
    for (let i = start; i <= end &&  
        end - i + 1 >= r - index; i++) {  
        data[index] = arr[i];  
        produceCombinations(arr, data, i+1, end, index+1, r,results);  
    }  
}

function round_to_precision(x, precision) {
    let y = +x + (precision === undefined ? 0.5 : precision/2);
    return y - (y % (precision === undefined ? 1 : +precision));
}


function arrProduct(indexes,arr,n){
    let result = [];
    for(let i=0;i<n;i++){
        let p = 1;
        for(index of indexes){
            
            p = p * arr[index][i];
        }
        result.push(p);
    }
    return result;
}

function sumProduct(arr1,arr2,n){
    let s=0;
    console.log(arr1);
    for(let i=0;i<n;i++){
        s += arr1[i]*arr2[i];
    }
    return s;
}

function produceVars(arr,n){
    for(let i=1;i<=n;i++){
        arr.push(i);
    }
}

function produceOnes(ones,n,combinations,vars){
    for(let i=0;i<=n;i++){
        let temp = [];
        let step = Math.pow(2,n-i)
        let ct = 0;
        for(let j=0;j<Math.pow(2,n);j+=step ){
            for(let k=j;k<j+step;k++){
                if(i==0){
                    temp.push(1)
                }
                else{
                    temp.push(Math.pow((-1),ct+1));
                }
            }
            ct++;
        }
        ones.push(temp);
    }
    
    let rawOnes = ones;
    for(v of vars){
        console.log(v)
    }
    for(let i=0;i<=n;i++){
        produceCombinations(vars,[],0,n-1,0,i,combinations);
    }
    
    for(c of combinations){
        console.log(c);
    }

    for(let i=n+1;i<Math.pow(2,n);i++){
        console.log(combinations[i]);
       ones.push(arrProduct(combinations[i],rawOnes,Math.pow(2,n)));
    }
}

function produceBetas(ones,Y,n,betas){
    //betas[0] = 1;
    console.log(ones)
    let nPow = Math.pow(2,n)
    for(let i=0;i<nPow;i++){
        betas[i] = sumProduct(ones[i],Y,nPow)/nPow;
    }
}

function selfProduct(indexes,arr){
    let p =1;
    for(index of indexes){
        p *= arr[index-1];
    }
    return p;
}

function produceResult(X,betas,combinations){
    let s = betas[0];
    for(let i=1;i<betas.length;i++){
        s += betas[i] * selfProduct(combinations[i],X);
    }
    return s
}

function produceFinalResults(inf,sup,step,betas,combinations,n,values){
    let results = [];
    
    let set = [];
    for(let i=inf;i<=sup;i+=step){
        set.push(i.toPrecision(2));
    }
    console.log(set)
    producePermutations(set,[],n-1,0,results,values,betas,combinations,n);
   
}

    function producePermutations (str, data, last, index,results,values,betas,combinations,n){
    let i, length = str.length;
    

    for ( i=0; i<length; i++ )
    {
        data[index] = str[i] ;
        //print string if it is last index
        if (index == last){
            let string = data.join(",");
           values[string] = produceResult(data,betas,combinations);
        }
        //Recurstion for next index if not last index
        else{ 
            producePermutations(str, data, last, index+1,results,values,betas,combinations,n);
        }
    }
}
    

function produceOutput(lim,values,keys){
    for(v in values){
        if(values[v] >= lim){
            keys.push(v);
        }
    }
}

//let n = 3;
let keys = [];
let values = [];
  

    function runCode(Y,n,lim){
        let vars = [];
        let combinations = [];
        //let Y = [0.67,0.61,0.79,0.75,0.59,0.52,0.90,0.87];
        produceVars(vars,n);
        let ones = [];
        produceOnes(ones,n,combinations,vars);
        let betas = [];
        produceBetas(ones,Y,n,betas);
        //change -1 1 0.2 for changing the interval of X
        produceFinalResults(-1,1,0.2,betas,combinations,n,values);
        
        //console.log(values);
        
        produceOutput(lim,values,keys)
    }
    





