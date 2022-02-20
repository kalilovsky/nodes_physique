class vecteur {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.z = 0;
    }
    setX(valeur){
        this.x = valeur;
    }
    getX(){
        return this.x;
    }
    setY(valeur){
        this.y = valeur;
    }
    getY(){
        return this.y;
    }
    setZ2D(valeur){
        this.z = valeur;
    }
    getZ2D(){
        return this.z;
    }
    setAngle(angle){
        let longueur = this.getLongueur();
        this.x = Math.cos(angle) * longueur;
        this.y = Math.sin(angle) * longueur;
    }
    getAngle(){
        return Math.atan2(this.y, this.x);
    }
    setLongueur(longueur){
        var angle = this.getAngle();
		this.x = Math.cos(angle) * longueur;
		this.y = Math.sin(angle) * longueur;
    }
    getLongueur(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    add(v2){
        return new vecteur(this.x + v2.getX(), this.y + v2.getY());
    }
    subtract(v2){
        return new vecteur(this.x - v2.getX(), this.y - v2.getY());
    }
    multiply(valeur){
        return new vecteur(this.x * valeur, this.y * valeur);
    }
    divide(valeur){
        return new vecteur(this.x / valeur, this.y / v2.valeur);
    }
    addTo(v2) {
		this.x += v2.getX();
		this.y += v2.getY();
        this.z += v2.getZ2D();
	}
    subtractFrom(v2) {
		this.x -= v2.getX();
		this.y -= v2.getY();
	}
    multiplyBy(valeur) {
		this.x *= valeur;
		this.y *= valeur;
	}
    divideBy(valeur) {
		this.x /= valeur;
		this.y /= valeur;
	}
    angleTo(v2){
        return Math.atan2(v2.getY() - this.getY(),v2.getX()-this.getX() );
    }
    distanceTo(v2){
        let dx = v2.getX() - this.getX();
        let dy = v2.getY() - this.getY();
        return Math.sqrt(dx* dx + dy * dy);
    }
}
	
	
	
	

	