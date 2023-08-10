--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Ubuntu 15.3-1.pgdg22.04+1)
-- Dumped by pg_dump version 15.3 (Ubuntu 15.3-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: breeds; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.breeds (
    id integer NOT NULL,
    name character varying(256) NOT NULL
);


--
-- Name: breeds_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.breeds_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: breeds_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.breeds_id_seq OWNED BY public.breeds.id;


--
-- Name: bunnies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.bunnies (
    id integer NOT NULL,
    name character varying(256) NOT NULL,
    "userId" integer NOT NULL,
    age character varying(256) NOT NULL,
    description text,
    "breedId" integer NOT NULL,
    "skinColorId" integer NOT NULL,
    "sizeId" integer NOT NULL,
    active boolean DEFAULT true NOT NULL,
    url text NOT NULL
);


--
-- Name: bunnies_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.bunnies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: bunnies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.bunnies_id_seq OWNED BY public.bunnies.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: sizes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sizes (
    id integer NOT NULL,
    name character varying(256) NOT NULL
);


--
-- Name: sizes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sizes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sizes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sizes_id_seq OWNED BY public.sizes.id;


--
-- Name: skinColors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."skinColors" (
    id integer NOT NULL,
    name character varying(256) NOT NULL
);


--
-- Name: skinColors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."skinColors_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: skinColors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."skinColors_id_seq" OWNED BY public."skinColors".id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(256) NOT NULL,
    email text NOT NULL,
    cpf character varying(11) NOT NULL,
    phone text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: breeds id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.breeds ALTER COLUMN id SET DEFAULT nextval('public.breeds_id_seq'::regclass);


--
-- Name: bunnies id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bunnies ALTER COLUMN id SET DEFAULT nextval('public.bunnies_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: sizes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sizes ALTER COLUMN id SET DEFAULT nextval('public.sizes_id_seq'::regclass);


--
-- Name: skinColors id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."skinColors" ALTER COLUMN id SET DEFAULT nextval('public."skinColors_id_seq"'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: breeds; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.breeds VALUES (2, 'Holandês ou Netherland Dwarf');
INSERT INTO public.breeds VALUES (3, 'Coelho-pigmeu da Bacia de Columbia');
INSERT INTO public.breeds VALUES (4, 'Mini Coelho Angorá Inglês');
INSERT INTO public.breeds VALUES (5, 'Jersey Wooly ou fator lanudo');
INSERT INTO public.breeds VALUES (1, 'RAÇA');
INSERT INTO public.breeds VALUES (6, 'Mini Lop ou Berlier');


--
-- Data for Name: bunnies; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.bunnies VALUES (3, 'Fofinha', 1, '1 ano', 'Um amor de coelhinha!', 1, 2, 1, true, 'https://farm7.staticflickr.com/6141/5968042213_9f4fa0a78d_b.jpg');
INSERT INTO public.bunnies VALUES (6, 'Fofuxo da lili', 3, '5 anos', 'Amo!!', 3, 3, 4, false, 'https://media-manager.noticiasaominuto.com.br/1920/naom_63c51601ec6d3.jpg');
INSERT INTO public.bunnies VALUES (7, 'Fofuxo da lili true', 3, '5 anos', 'Amo!!', 3, 3, 4, true, 'https://media-manager.noticiasaominuto.com.br/1920/naom_63c51601ec6d3.jpg');
INSERT INTO public.bunnies VALUES (10, 'Teste de update', 1, '2 dias', 'lalalal', 5, 7, 4, true, 'https://qph.cf2.quoracdn.net/main-qimg-ef56d41f0790345f42a17454c9e057b3-lq');
INSERT INTO public.bunnies VALUES (5, 'Fofuxo 2 true agr', 1, '1 ano', 'Super raro de encontrar!!', 1, 1, 1, true, 'https://media-manager.noticiasaominuto.com.br/1920/naom_63c51601ec6d3.jpg');
INSERT INTO public.bunnies VALUES (12, 'Novo dado', 1, '1 ano', 'Novo dado', 4, 1, 1, true, 'https://www.zooplus.co.uk/magazine/wp-content/uploads/2022/03/white-angora-rabbit-on-grass.jpeg');
INSERT INTO public.bunnies VALUES (2, 'Novo Caramelo 2', 1, 'de 6 meses para 1 ano', 'Amo muito!!', 1, 4, 1, true, 'https://i.pinimg.com/originals/d9/12/fd/d912fd8be8d691c385a07de37d0ac14c.jpg');
INSERT INTO public.bunnies VALUES (4, 'Fofuxo novo', 1, '1 ano', 'Super raro de encontrar!!', 3, 2, 4, true, 'https://media-manager.noticiasaominuto.com.br/1920/naom_63c51601ec6d3.jpg');
INSERT INTO public.bunnies VALUES (8, 'Novo', 3, '5 anos', 'Amo!!', 3, 3, 4, false, 'https://media-manager.noticiasaominuto.com.br/1920/naom_63c51601ec6d3.jpg');
INSERT INTO public.bunnies VALUES (13, 'Outro pet do bruno', 4, '2 meses', 'Amoooo', 4, 7, 4, false, 'https://www.zooplus.co.uk/magazine/wp-content/uploads/2022/03/white-angora-rabbit-on-grass.jpeg');
INSERT INTO public.bunnies VALUES (14, 'Piccola', 6, '7 anos', 'Minha princesinha!', 6, 4, 5, true, 'https://i.ytimg.com/vi/JQQElo6qsCE/sddefault.jpg');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (2, 1, '30889a9e-d03e-4916-9d70-75693d81f95e', '2023-08-08 12:47:42.400532');
INSERT INTO public.sessions VALUES (3, 3, 'ae14e3c1-5213-4a65-a49d-d0b2568c01b6', '2023-08-08 20:54:28.395458');
INSERT INTO public.sessions VALUES (4, 4, '293f91f7-6dc1-4cd7-a135-a295cf9b0c34', '2023-08-08 21:05:31.003437');
INSERT INTO public.sessions VALUES (5, 4, '6f8dd84d-d87e-4a2c-bc88-71e57e2722eb', '2023-08-08 21:33:49.57424');
INSERT INTO public.sessions VALUES (6, 4, '1cfb6488-6d95-4c11-a4e0-8182ea213544', '2023-08-08 22:26:55.874516');
INSERT INTO public.sessions VALUES (7, 4, 'a2ddb567-6e32-4883-9471-ef0894d5d2c0', '2023-08-08 22:39:23.443365');
INSERT INTO public.sessions VALUES (8, 4, '431f7e6d-96af-4ca1-952f-645a6633fc2b', '2023-08-08 23:19:08.446232');
INSERT INTO public.sessions VALUES (9, 4, '43b1b0f7-1466-4f44-b616-afe0a6bf4d34', '2023-08-09 00:55:31.770927');
INSERT INTO public.sessions VALUES (10, 4, 'f29fa455-3666-4f8c-be03-013953a0c5ac', '2023-08-09 01:41:56.297178');
INSERT INTO public.sessions VALUES (11, 4, '26206e64-c603-49d2-bd81-6a4c63a2881d', '2023-08-09 11:26:08.675711');
INSERT INTO public.sessions VALUES (12, 1, '3a48fd45-8d91-4987-88d6-7042157f1da9', '2023-08-09 11:45:52.819502');
INSERT INTO public.sessions VALUES (13, 5, 'ffd75940-3c46-4c7f-b0db-021e896270ec', '2023-08-09 11:46:55.231943');
INSERT INTO public.sessions VALUES (14, 1, 'c731bb41-3ea0-4f90-a380-d6fdb33befcb', '2023-08-09 11:47:32.268524');
INSERT INTO public.sessions VALUES (15, 1, '385466e9-ade9-4110-8de9-b45ee1ac4543', '2023-08-09 14:14:54.717311');
INSERT INTO public.sessions VALUES (16, 1, '039eb852-9c5e-443a-b6dd-761423480299', '2023-08-09 14:24:13.79477');
INSERT INTO public.sessions VALUES (17, 1, '773a3159-c7a1-4032-b32b-16c78ca9f414', '2023-08-09 14:26:32.344252');
INSERT INTO public.sessions VALUES (18, 1, '9244c599-932a-4ac1-89e9-95f36c007406', '2023-08-09 14:29:31.607577');
INSERT INTO public.sessions VALUES (19, 1, 'ac841007-9760-4fd7-a86f-da79f04e666a', '2023-08-09 15:11:42.031737');
INSERT INTO public.sessions VALUES (20, 1, '03eefa7d-83f6-4130-9dd9-9f0bdd98b01f', '2023-08-09 15:13:57.764964');
INSERT INTO public.sessions VALUES (21, 1, '1f0196ff-5941-4a91-addc-0d5cddb0eb54', '2023-08-09 15:22:37.806058');
INSERT INTO public.sessions VALUES (22, 1, '580c21aa-7278-4b5b-8b28-87fc48b48d18', '2023-08-09 16:19:31.248686');
INSERT INTO public.sessions VALUES (23, 4, '17a9fd5b-3c6b-4749-b8ac-5432f68dfc33', '2023-08-09 16:21:41.962414');
INSERT INTO public.sessions VALUES (24, 1, '311bbaa6-790c-4e80-bc5f-08ca04b43b76', '2023-08-09 16:23:12.473906');
INSERT INTO public.sessions VALUES (25, 1, '73d68fbf-82a3-4ff4-8451-abb3e8d8f3bb', '2023-08-09 20:46:53.401448');
INSERT INTO public.sessions VALUES (26, 4, '06d2dd1a-d681-4c68-9b44-35cf0916ce97', '2023-08-10 10:58:27.239281');
INSERT INTO public.sessions VALUES (27, 1, 'b010eb2f-a9f2-44d4-9a71-bceb0827ee7f', '2023-08-10 15:02:23.590084');
INSERT INTO public.sessions VALUES (29, 4, '323dda27-1682-488c-ad84-4aded0418399', '2023-08-10 16:01:00.203859');
INSERT INTO public.sessions VALUES (31, 6, '9667e637-9266-435b-8ed6-dd81913f781c', '2023-08-10 16:32:46.309154');


--
-- Data for Name: sizes; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sizes VALUES (2, 'Médio');
INSERT INTO public.sizes VALUES (3, 'Grande');
INSERT INTO public.sizes VALUES (4, 'Anão');
INSERT INTO public.sizes VALUES (1, 'TAMANHO');
INSERT INTO public.sizes VALUES (5, 'Pequeno');


--
-- Data for Name: skinColors; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."skinColors" VALUES (2, 'Preto');
INSERT INTO public."skinColors" VALUES (3, 'Cinza');
INSERT INTO public."skinColors" VALUES (4, 'Bege');
INSERT INTO public."skinColors" VALUES (5, 'Broken: Branco + Outra cor');
INSERT INTO public."skinColors" VALUES (6, 'Tricolor: Branco + Outras duas cores');
INSERT INTO public."skinColors" VALUES (1, 'COR DO PELO');
INSERT INTO public."skinColors" VALUES (7, 'Branco');
INSERT INTO public."skinColors" VALUES (8, 'Outro');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Juliana', 'juliana@gmail.com', '11122233304', '21992921010', '$2b$10$Eu8S8.BQS6csQ7yD5T/V.e6Jmp5jQPO/Zi6rEpFtXQRz1i2tk.LyC', '2023-08-08 08:33:36.052221');
INSERT INTO public.users VALUES (3, 'Lilian', 'lilian@gmail.com', '11122233305', '21993334998', '$2b$10$8mw.BBVyOruGJ9BMYXxZeuHInK8e6fmRuH8r5ElpVpLEP9j6.RpkO', '2023-08-08 12:33:46.008542');
INSERT INTO public.users VALUES (4, 'Bruno', 'bruno@gmail.com', '11122288890', '22988882667', '$2b$10$MQacyJ/NAXmp4nN5QjbasuBlDgi9K4BnIUvPWjjWe3jE/8r7gFVb2', '2023-08-08 21:05:08.776587');
INSERT INTO public.users VALUES (5, 'Leticia', 'leticia@gmail.com', '99988800070', '21988990070', '$2b$10$xjStCnW/IyWsvW1Ofsxp6eklq5fbFA5Ws8Jpd6eZqzfs2Mrv2tAuS', '2023-08-09 11:46:46.357322');
INSERT INTO public.users VALUES (6, 'Juliana', 'ju@gmail.com', '15555222205', '21982892679', '$2b$10$AU1X.eLSI9UNkUTq3.iYbe2iP6ulO2WwsZJc9GsbXsr85ih5Chf.6', '2023-08-10 16:21:04.033621');


--
-- Name: breeds_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.breeds_id_seq', 6, true);


--
-- Name: bunnies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.bunnies_id_seq', 14, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 31, true);


--
-- Name: sizes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sizes_id_seq', 5, true);


--
-- Name: skinColors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."skinColors_id_seq"', 8, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- Name: breeds breeds_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.breeds
    ADD CONSTRAINT breeds_pkey PRIMARY KEY (id);


--
-- Name: bunnies bunnies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bunnies
    ADD CONSTRAINT bunnies_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sizes sizes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sizes
    ADD CONSTRAINT sizes_pkey PRIMARY KEY (id);


--
-- Name: skinColors skinColors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."skinColors"
    ADD CONSTRAINT "skinColors_pkey" PRIMARY KEY (id);


--
-- Name: users users_cpf_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_cpf_key UNIQUE (cpf);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: bunnies bunnies_breedId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bunnies
    ADD CONSTRAINT "bunnies_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES public.breeds(id);


--
-- Name: bunnies bunnies_sizeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bunnies
    ADD CONSTRAINT "bunnies_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES public.sizes(id);


--
-- Name: bunnies bunnies_skinColorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bunnies
    ADD CONSTRAINT "bunnies_skinColorId_fkey" FOREIGN KEY ("skinColorId") REFERENCES public."skinColors"(id);


--
-- Name: bunnies bunnies_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bunnies
    ADD CONSTRAINT "bunnies_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

