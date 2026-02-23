# 🎯 Installation et Configuration du Système de Blog

## ✅ Ce qui a été mis en place

### 1. **Système d'Authentification avec Better Auth**
- Authentification par email/mot de passe
- Sessions sécurisées avec cookies
- Protection des routes admin via middleware
- Rôles utilisateurs (admin/user)

### 2. **Base de Données avec Prisma + MySQL**
- Modèles : User, Session, Category, BlogPost
- Relations complètes entre les entités
- Migrations automatiques
- Seeding pour les données initiales

### 3. **Back Office Admin Complet**
- Gestion des catégories (CRUD)
- Gestion des articles (CRUD)
- Interface moderne et responsive
- Système d'article en vedette
- Déconnexion sécurisée

### 4. **API REST Complète**
- `/api/auth/*` - Authentification
- `/api/posts` - Gestion des articles
- `/api/posts/[id]` - Article spécifique
- `/api/categories` - Gestion des catégories
- `/api/categories/[id]` - Catégorie spécifique

### 5. **Page Blog Publique**
- Affichage dynamique des articles
- Article en vedette mis en avant
- Grille responsive des articles
- Animation au scroll avec Framer Motion

## 🚀 Installation Rapide

### Prérequis
- Node.js 20+
- MySQL en cours d'exécution
- pnpm installé

### Étapes d'installation

1. **Installer les dépendances**
   ```bash
   pnpm install
   ```

2. **Configurer l'environnement**
   
   Le fichier `.env` est déjà configuré avec :
   ```env
   DATABASE_URL="mysql://root:root0990@localhost:3306/btalents"
   BETTER_AUTH_SECRET="your-super-secret-key-change-this-in-production"
   BETTER_AUTH_URL="http://localhost:3000"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

3. **Générer le client Prisma**
   ```bash
   pnpm prisma generate
   ```

4. **Appliquer les migrations**
   ```bash
   pnpm prisma migrate dev
   ```

5. **Initialiser les données**
   ```bash
   pnpm db:seed
   ```
   
   Cela créera :
   - Un utilisateur admin (admin@btalents.com / admin123)
   - 4 catégories par défaut (Trends, Design, Development, Strategy)
   - 4 articles de démonstration

6. **Lancer le serveur**
   ```bash
   pnpm dev
   ```

7. **Accéder à l'application**
   - Site public : `http://localhost:3000`
   - Blog : `http://localhost:3000/blog`
   - Admin : `http://localhost:3000/admin/login`

## 📁 Structure du Projet

```
btalents/
├── app/
│   ├── (admin)/
│   │   └── admin/
│   │       ├── blog/page.tsx       # Interface admin du blog
│   │       └── login/page.tsx      # Page de connexion
│   ├── (publics)/
│   │   └── blog/page.tsx           # Page publique du blog
│   └── api/
│       ├── auth/[...all]/route.ts  # Routes Better Auth
│       ├── posts/                  # API des articles
│       └── categories/             # API des catégories
├── lib/
│   ├── auth.ts                     # Configuration Better Auth
│   ├── auth-client.ts              # Client Better Auth (frontend)
│   ├── server-auth.ts              # Helpers auth serveur
│   └── prisma.ts                   # Client Prisma configuré
├── prisma/
│   ├── schema.prisma               # Schéma de la base de données
│   ├── seed.ts                     # Script de seeding
│   └── migrations/                 # Migrations SQL
├── middleware.ts                   # Protection des routes admin
├── GUIDE_ADMIN.md                  # Guide d'utilisation admin
└── INSTALLATION.md                 # Ce fichier
```

## 🔑 Identifiants par Défaut

**Email** : `admin@btalents.com`  
**Mot de passe** : `admin123`

⚠️ **IMPORTANT** : Changez ces identifiants en production !

## 🎨 Fonctionnalités Principales

### Pour les Administrateurs

1. **Gestion des Catégories**
   - Créer des catégories pour organiser les articles
   - Voir le nombre d'articles par catégorie
   - Supprimer les catégories non utilisées

2. **Gestion des Articles**
   - Créer des articles avec titre, description, image
   - Associer un article à une catégorie
   - Marquer un article comme "en vedette"
   - Modifier et supprimer des articles

3. **Sécurité**
   - Connexion sécurisée avec Better Auth
   - Protection automatique des routes admin
   - Sessions persistantes (7 jours)

### Pour les Visiteurs

- Consultation du blog avec tous les articles
- Article en vedette mis en avant
- Interface moderne et responsive
- Animations fluides

## 🛠️ Commandes Disponibles

```bash
# Développement
pnpm dev                    # Lancer le serveur de dev

# Base de données
pnpm prisma generate        # Générer le client Prisma
pnpm prisma migrate dev     # Créer une migration
pnpm prisma studio          # Interface graphique DB
pnpm db:seed                # Réinitialiser les données

# Build
pnpm build                  # Build pour production
pnpm start                  # Lancer en production
```

## 📦 Dépendances Principales

- **Next.js 16** - Framework React
- **Prisma 7.4** - ORM
- **Better Auth 1.4** - Authentification
- **bcrypt 6.0** - Hashage des mots de passe
- **Framer Motion 12** - Animations
- **Tailwind CSS 4** - Styling
- **Lucide React** - Icônes

## 🔐 Sécurité

### Implémentée
- ✅ Mots de passe hashés avec bcrypt
- ✅ Sessions sécurisées
- ✅ Protection CSRF
- ✅ Middleware de protection des routes
- ✅ Validation des données

### À Faire en Production
- ⚠️ Changer les secrets dans `.env`
- ⚠️ Configurer HTTPS
- ⚠️ Limiter les tentatives de connexion
- ⚠️ Ajouter des logs d'audit
- ⚠️ Configurer les CORS

## 📝 Prochaines Améliorations Possibles

1. **Upload d'images** : Intégrer Cloudinary ou AWS S3
2. **Éditeur riche** : Ajouter un éditeur WYSIWYG (TipTap, Slate)
3. **Brouillons** : Système de brouillons avant publication
4. **Tags** : Ajouter des tags en plus des catégories
5. **Recherche** : Recherche full-text des articles
6. **Commentaires** : Système de commentaires
7. **Analytics** : Statistiques de lecture
8. **SEO** : Métadonnées dynamiques, sitemap
9. **Newsletter** : Intégration email (Resend, SendGrid)
10. **Multi-langues** : Support i18n

## 🆘 Support

Pour toute question :
1. Consultez `GUIDE_ADMIN.md` pour l'utilisation
2. Vérifiez les logs de la console
3. Utilisez `pnpm prisma studio` pour inspecter la DB

## 🎉 Félicitations !

Votre système de blog avec authentification est maintenant opérationnel ! 🚀
