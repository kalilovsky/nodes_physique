//https://www.mamboleoo.be/articles/how-to-render-3d-in-2d-canvas
//https://www.youtube.com/watch?v=AOu1awuEqjE
//https://dynref.engr.illinois.edu/rvs.html

class nodeThreeD {

    /**
     * Un point en 3D, alias Node
     * Initialiser les Nodes dans une spheres en coordonées cartésiennes
     * https://dynref.engr.illinois.edu/rvs.html
     * https://www.techno-science.net/glossaire-definition/Coordonnees-polaires-page-6.html
     * @param {*} centerX c'est le centre de gravité sur l'axe X
     * @param {*} centerY c'est le centre de gravité sur l'axe Y  
     * @param {*} rayonNode rayon du node en px
     * @param {*} rayonSphere rayon de la sphere
     * @param {*} profondeur
     */

    constructor(centerX, centerY, rayonNode, rayonSphere, profondeur) {
        
        
        this.rayonNode = rayonNode ? rayonNode : 5;
        this.profondeur = profondeur ? profondeur : 800;
        this.rayonSphere = rayonSphere ? rayonSphere : 200;
        
        //nombre aléatoire compris entre 0 e 2 PI ou 0 et 1PI
        //angle mesuré depuis l'axe des x et compris entre -180° et 180°
        this.longitude = randomBetween(0, 2 * Math.PI);
        //l'angle depuis le plan équatorial (entre -90° et 90°).
        //cela devait être cette fonction mais elle concentre beaucoup de nodes
        //sur les poles j'ai trouvé cette équation qui résout le probleme
        // this.colatitude = randomBetween(0,Math.PI);
        //comme cela est expliqué ici https://www.mamboleoo.be/articles/how-to-render-3d-in-2d-canvas
        this.colatitude = Math.acos(randomBetween(-1, 1));
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.tailleProjection = 0
        this.position = new vecteur(0,0);
        this.mouvement = new vecteur(0,0);
        this.gravityCenter = new vecteur(centerX,centerY);
        


    }

    /**
     * Rafraichir les positions du Node dans une spheres en coordonées cartésiennes
     * selon un angle précis.
     * @param {*} angle Angle de rotation
    */
    mouvementSpherique(angle,centerPos) {
        //En cas de mouvement du centre de gravity, qui est au fait le curseur de la souris dans notre cas,
        //on calcul la distance entre le centre de gravité actuelle et le centre de gravité réel
        // si la distance est plus grande que 3px, on entamme le mouvement des nodes
        //en calculant l'angle entre les deux point "les deux centre de gravité actuelle et celui qui a bougé de plus de 3px"
        //en crée une vitesse aléatoire comprise en 0 et 6px/frame, et en enclanche le mouvement
        //grace aux équation si dessous SIN et COS, multplier par la vitesse, ceci nous donnera une mouvement de foule 
        //aléatoire des dots en perdant la forme sphérique global. 
        
        let efr = this.gravityCenter.distanceTo(centerPos);
        if (this.gravityCenter.distanceTo(centerPos)>3){
        let testangle = this.gravityCenter.angleTo(centerPos);
        let perframe = randomBetween(0,6);

        this.gravityCenter.y += Math.sin(testangle) * perframe;
        this.gravityCenter.x += Math.cos(testangle) * perframe;
        }

        //Pas la peine de se casser la tête c'est des équations trigonométrique qui convertissent
        //des coordonnées polaires en coordonnées cartésiennes, c'est des lois on les prends tel quel.
        this.mouvement.x =( this.rayonSphere * Math.sin(this.colatitude) * Math.cos(this.longitude));
        this.mouvement.y =( this.rayonSphere * Math.cos(this.colatitude));
        this.mouvement.z =( this.rayonSphere * Math.sin(this.colatitude) * Math.sin(this.longitude) + this.rayonSphere);

        //Sachant que nous n'avons pas réelement de Z car nous en 2D, ceci nous permet de 
        //calculer la taille du node pour le déssiner.
        this.tailleProjection = this.profondeur / (this.profondeur + this.mouvement.z);
        //multiplier le X et le Y du mouvement par la taille 
        this.mouvement.multiplyBy(this.tailleProjection);
        //Affecter les X et Y réel du node en formations 3D
        //en lui rajoutant le coordonnées cardinaux du centre de gravité
        //pour s'assurer du mouvement de tous les nodes en cas de mouvement ddu
        //centre de gravité.
        this.position.x =((this.mouvement.x ) + this.gravityCenter.x);
        this.position.y =((this.mouvement.y ) + this.gravityCenter.y);
       
        //incrémenter l'angle pour ajouter du mouvement à tous les angle-----------------------------------------------------------------------------------
        this.longitude += angle;


    }
    /**
     * Rafraichir les positions du Node dans une spheres en coordonées cartésiennes
     * selon un angle précis.
     * @param {*} angle Angle de rotation
    */
   moveVersCenter(centerPos){
    
   }
    /**
      * Déssiner les nodes dans le CTX 2D
      * @param {*} ctx le CTX 2D qui vient de l'élément HTML Canvas
     */
    draw(ctx) {

        //on pourrait rajouter une couleur spécifique à chaque node, ou uen couleur unique dans le constructeur
        //à réflechir
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.rayonNode * this.tailleProjection, 0, Math.PI * 2, true);
        ctx.fill();

    }

}