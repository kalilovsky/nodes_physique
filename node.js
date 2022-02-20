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
        
        this.centerX = centerX ? centerX : 0;
        this.centerY = centerY ? centerY : 0;
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
        this.tailleProj = 0
        this.xProj = 0;
        this.yProj = 0;


    }

    /**
     * Rafraichir les positions du Node dans une spheres en coordonées cartésiennes
     * selon un angle précis.
     * @param {*} angle Angle de rotation
    */
    update(angle) {

        //Pas la peine de se casser la tête c'est des équations trigonométrique qui convertissent
        //des coordonnées polaires en coordonnées cartésiennes, c'est des lois on les prends tel quel.
        this.x = this.rayonSphere * Math.sin(this.colatitude) * Math.cos(this.longitude);
        this.y = this.rayonSphere * Math.cos(this.colatitude);
        this.z = this.rayonSphere * Math.sin(this.colatitude) * Math.sin(this.longitude) + this.rayonSphere;

        //Sachant que nous n'avons pas réelement de Z car nous en 2D, ceci nous permet de 
        //calculer la taille du node pour le déssiner.
        this.tailleProj = this.profondeur / (this.profondeur + this.z);
        //Affecter les X et Y réel en formations 3D
        this.xProj = (this.x * this.tailleProj) + this.centerX;
        this.yProj = (this.y * this.tailleProj) + this.centerY;
        //il faudrait aussi rajouter un autre calcul qui permet de changer la taille selon le Z
        //------------------------------------------------------------------------------------
        this.longitude += angle;


    }
    /**
      * Déssiner les nodes dans le CTX 2D
      * @param {*} ctx le CTX 2D qui vient de l'élément HTML Canvas
     */
    draw(ctx) {

        //on pourrait rajouter une couleur spécifique à chaque node, ou uen couleur unique dans le constructeur
        //à réflechir
        ctx.beginPath();
        ctx.arc(this.xProj, this.yProj, this.rayonNode * this.tailleProj, 0, Math.PI * 2, true);
        ctx.fill();

    }
        
}