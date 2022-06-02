export const distance = (X1,X2,Y1,Y2) => {
    return(Math.sqrt(
        (Math.pow(X1-X2,2)
        +
        Math.pow(Y1-Y2,2))
    ));
}

export const angleFromTriangle = (Da,Db,Dc) => {
    let a2=Da*Da;
    let b2=Db*Db;
    let c2=Dc*Dc;

    return Math.acos((a2 + b2 - c2)/(2*Da*Db));
}