# Guide d'Administration du Blog

## 🚀 Démarrage Rapide

### 1. Initialiser la base de données

Si ce n'est pas encore fait, exécutez les migrations et le seeding :

```bash
# Appliquer les migrations
pnpm prisma migrate dev

# Initialiser les données (admin + catégories + articles de démo)
pnpm db:seed
```

### 2. Lancer le serveur de développement

```bash
pnpm dev
```

Le site sera accessible sur `http://localhost:3000`

## 🔐 Authentification

### Identifiants par défaut

Après le seeding, vous pouvez vous connecter avec :

- **Email**: `admin@btalents.com`
- **Mot de passe**: `admin123`

⚠️ **Important** : Changez ces identifiants en production !

### Pages d'authentification

- **Connexion** : `http://localhost:3000/admin/login`
- **Inscription** : `http://localhost:3000/admin/register`

### Créer un nouveau compte

1. Accédez à la page d'inscription
2. Remplissez le formulaire (nom, email, mot de passe)
3. Cliquez sur "S'inscrire"
4. Vous serez automatiquement connecté et redirigé vers le back office

**Note** : Les nouveaux comptes créés via l'inscription ont le rôle "user" par défaut. Pour créer un compte admin, vous devez modifier le rôle directement dans la base de données.

## 📝 Gestion du Blog

### Accès au back office

Une fois connecté, vous serez redirigé vers : `http://localhost:3000/admin/blog`

### Fonctionnalités disponibles

#### 1. Gestion des Catégories

- **Créer une catégorie** : Cliquez sur le bouton "Catégorie" (vert)
- **Voir les catégories** : Affichées en haut avec le nombre d'articles
- **Supprimer une catégorie** : Cliquez sur l'icône poubelle (⚠️ nécessite que la catégorie n'ait pas d'articles)

#### 2. Gestion des Articles

- **Créer un article** : Cliquez sur "Nouvel Article" (bleu)
- **Modifier un article** : Cliquez sur l'icône crayon
- **Supprimer un article** : Cliquez sur l'icône poubelle
- **Article en vedette** : Cochez la case "Article en vedette" (un seul article peut être en vedette à la fois)

### Champs requis pour un article

- **Titre** : Le titre de l'article
- **Description** : Un résumé de l'article
- **Catégorie** : Sélectionnez une catégorie existante
- **URL de l'image** (optionnel) : Lien vers une image
- **Article en vedette** (optionnel) : Pour mettre en avant sur la page d'accueil

## 🎨 Page Publique du Blog

Les articles sont visibles sur : `http://localhost:3000/blog`

- L'article en vedette s'affiche en grand en haut
- Les autres articles sont affichés dans une grille
- Les articles sont triés du plus récent au plus ancien

## 🗄️ Structure de la Base de Données

### Tables principales

- **users** : Utilisateurs (admins et auteurs)
- **sessions** : Sessions d'authentification
- **categories** : Catégories des articles
- **blog_posts** : Articles du blog

### Relations

- Un article appartient à une catégorie
- Un article a un auteur (user)
- Un utilisateur peut avoir plusieurs articles

## 🔒 Sécurité

- Toutes les routes `/admin/*` (sauf `/admin/login`) sont protégées
- Seuls les utilisateurs avec le rôle `admin` peuvent créer/modifier/supprimer
- Les sessions expirent après 7 jours
- Les mots de passe sont hashés avec bcrypt

## 🛠️ Commandes Utiles

```bash
# Générer le client Prisma après modification du schéma
pnpm prisma generate

# Créer une nouvelle migration
pnpm prisma migrate dev --name nom_de_la_migration

# Ouvrir Prisma Studio (interface graphique)
pnpm prisma studio

# Réinitialiser la base de données et le seeding
pnpm prisma migrate reset
```

## 📚 Technologies Utilisées

- **Next.js 16** : Framework React
- **Prisma** : ORM pour la base de données
- **MySQL** : Base de données
- **Better Auth** : Système d'authentification
- **Tailwind CSS** : Styling
- **Framer Motion** : Animations

## 🆘 Dépannage

### Erreur de connexion à la base de données

Vérifiez que :
1. MySQL est lancé
2. Les credentials dans `.env` sont corrects
3. La base de données `btalents` existe

### Impossible de se connecter

1. Vérifiez que le seeding a bien été exécuté
2. Essayez de réinitialiser le mot de passe dans la base de données
3. Vérifiez les cookies de votre navigateur

### Les articles ne s'affichent pas

1. Vérifiez que des articles existent dans la base de données
2. Ouvrez la console du navigateur pour voir les erreurs
3. Vérifiez que l'API `/api/posts` retourne des données

## 📧 Support

Pour toute question ou problème, contactez l'équipe de développement.
