--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

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

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Department; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Department" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    department text NOT NULL
);


ALTER TABLE public."Department" OWNER TO postgres;

--
-- Name: Printing; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Printing" (
    id integer NOT NULL,
    "reprintReason" text NOT NULL,
    "printType" text NOT NULL,
    "studentId" text NOT NULL,
    "printedByUserId" text NOT NULL,
    "printedDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "releasedByUserId" text NOT NULL,
    "releasedDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "schoolYearId" text NOT NULL,
    "semesterId" text NOT NULL
);


ALTER TABLE public."Printing" OWNER TO postgres;

--
-- Name: Printing_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Printing_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Printing_id_seq" OWNER TO postgres;

--
-- Name: Printing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Printing_id_seq" OWNED BY public."Printing".id;


--
-- Name: Program; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Program" (
    id text NOT NULL,
    "departmentId" text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    program text NOT NULL
);


ALTER TABLE public."Program" OWNER TO postgres;

--
-- Name: SchoolYear; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SchoolYear" (
    id text NOT NULL,
    "isActive" boolean DEFAULT false NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "schoolYearFrom" integer NOT NULL,
    "schoolYearTo" integer NOT NULL
);


ALTER TABLE public."SchoolYear" OWNER TO postgres;

--
-- Name: Semester; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Semester" (
    id text NOT NULL,
    semester text NOT NULL,
    "semestralDateStart" timestamp(3) without time zone NOT NULL,
    "semestralDateEnd" timestamp(3) without time zone NOT NULL,
    "isActive" boolean DEFAULT false NOT NULL,
    "schoolYearId" text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Semester" OWNER TO postgres;

--
-- Name: Student; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Student" (
    id text NOT NULL,
    "idNumber" text NOT NULL,
    "lastName" text NOT NULL,
    "firstName" text NOT NULL,
    "middleInitial" text NOT NULL,
    address text NOT NULL,
    guardian text NOT NULL,
    "guardianContact" text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "esignUrl" text,
    "photoUrl" text,
    "programId" text NOT NULL,
    "birthDate" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Student" OWNER TO postgres;

--
-- Name: StudentUpdate; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."StudentUpdate" (
    id integer NOT NULL,
    "updatedDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" text NOT NULL,
    "studentId" text NOT NULL
);


ALTER TABLE public."StudentUpdate" OWNER TO postgres;

--
-- Name: StudentUpdate_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."StudentUpdate_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."StudentUpdate_id_seq" OWNER TO postgres;

--
-- Name: StudentUpdate_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."StudentUpdate_id_seq" OWNED BY public."StudentUpdate".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    username text NOT NULL,
    "fullName" text NOT NULL,
    photo text,
    role text NOT NULL,
    email text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    password text NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: Validation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Validation" (
    id integer NOT NULL,
    "studentId" text NOT NULL,
    "dateValidated" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "schoolYearId" text NOT NULL,
    "semesterId" text NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public."Validation" OWNER TO postgres;

--
-- Name: Validation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Validation_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Validation_id_seq" OWNER TO postgres;

--
-- Name: Validation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Validation_id_seq" OWNED BY public."Validation".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Printing id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Printing" ALTER COLUMN id SET DEFAULT nextval('public."Printing_id_seq"'::regclass);


--
-- Name: StudentUpdate id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StudentUpdate" ALTER COLUMN id SET DEFAULT nextval('public."StudentUpdate_id_seq"'::regclass);


--
-- Name: Validation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Validation" ALTER COLUMN id SET DEFAULT nextval('public."Validation_id_seq"'::regclass);


--
-- Data for Name: Department; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Department" (id, "userId", "createdAt", department) FROM stdin;
6db59750-c799-4e47-bd04-e127e394aa91	2b9bc8ce-097d-4a86-bfdd-7080ddd5d43f	2024-05-05 11:25:55.007	Department of Teacher Education
5aba9f43-1b03-443b-baad-434b199162a2	2b9bc8ce-097d-4a86-bfdd-7080ddd5d43f	2024-05-05 11:27:01.225	Department of Criminal Justice Education
d1c79156-6213-41da-a50a-da71dd6cff2e	2b9bc8ce-097d-4a86-bfdd-7080ddd5d43f	2024-05-05 12:01:23.342	Department of Business Administration Education
2a7a5dc9-e9e9-44b5-95c7-59a016c03261	2b9bc8ce-097d-4a86-bfdd-7080ddd5d43f	2024-05-05 11:21:33.062	Department of Arts and Sciences Education
206ccfa7-160b-4ee4-9557-9fe5e402df5c	2b9bc8ce-097d-4a86-bfdd-7080ddd5d43f	2024-05-09 10:53:14.508	Department of Accounting Education
\.


--
-- Data for Name: Printing; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Printing" (id, "reprintReason", "printType", "studentId", "printedByUserId", "printedDate", "releasedByUserId", "releasedDate", "schoolYearId", "semesterId") FROM stdin;
\.


--
-- Data for Name: Program; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Program" (id, "departmentId", "userId", "createdAt", program) FROM stdin;
9d2230c9-53e2-465c-8f9d-4fb586a20856	5aba9f43-1b03-443b-baad-434b199162a2	2b9bc8ce-097d-4a86-bfdd-7080ddd5d43f	2024-05-09 10:47:20.022	BS in Criminology
f76849db-f438-44e3-96e8-07a5e8b2030f	2a7a5dc9-e9e9-44b5-95c7-59a016c03261	2b9bc8ce-097d-4a86-bfdd-7080ddd5d43f	2024-05-09 10:47:51.041	BS in Information Tech
1a529faa-6cbc-4da3-9203-97a862d43e4d	2a7a5dc9-e9e9-44b5-95c7-59a016c03261	2b9bc8ce-097d-4a86-bfdd-7080ddd5d43f	2024-05-09 10:48:14.899	BS in Psychology
c63711ab-403e-445d-84ca-05647e106bfd	2a7a5dc9-e9e9-44b5-95c7-59a016c03261	2b9bc8ce-097d-4a86-bfdd-7080ddd5d43f	2024-05-09 10:48:24.985	AB in English
4cb99da7-0f01-4cd4-afda-ad584223939e	d1c79156-6213-41da-a50a-da71dd6cff2e	2b9bc8ce-097d-4a86-bfdd-7080ddd5d43f	2024-05-09 10:48:46.416	BSBA - Financial Mgt
d48c2e99-e4e9-49f9-943f-6a104eb8eb32	d1c79156-6213-41da-a50a-da71dd6cff2e	2b9bc8ce-097d-4a86-bfdd-7080ddd5d43f	2024-05-09 10:49:05.26	BSBA - Marketing Mgt
debcff1a-85cf-4856-9b70-3c4ab80ee6bd	d1c79156-6213-41da-a50a-da71dd6cff2e	2b9bc8ce-097d-4a86-bfdd-7080ddd5d43f	2024-05-09 10:49:22.196	BSBA - HR Management
b7df2366-4c56-42f6-94f2-0403ff657e88	206ccfa7-160b-4ee4-9557-9fe5e402df5c	2b9bc8ce-097d-4a86-bfdd-7080ddd5d43f	2024-05-09 10:53:25.689	BS in Accountancy
2f260446-4869-4282-aaf2-8290e3110766	206ccfa7-160b-4ee4-9557-9fe5e402df5c	2b9bc8ce-097d-4a86-bfdd-7080ddd5d43f	2024-05-09 10:53:44.328	BS in Management Acctg
6b8b31d7-4819-4353-99c4-af75e675d993	6db59750-c799-4e47-bd04-e127e394aa91	2b9bc8ce-097d-4a86-bfdd-7080ddd5d43f	2024-05-05 12:50:44.314	Bachelor of Elementary Educ
6f781c99-87a4-4ab3-a143-c2259c6d5cea	6db59750-c799-4e47-bd04-e127e394aa91	2b9bc8ce-097d-4a86-bfdd-7080ddd5d43f	2024-05-09 10:54:47.068	BSED - English
\.


--
-- Data for Name: SchoolYear; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SchoolYear" (id, "isActive", "userId", "createdAt", "schoolYearFrom", "schoolYearTo") FROM stdin;
0c2678e1-75b8-4960-845c-659d7c54aabf	t	2b9bc8ce-097d-4a86-bfdd-7080ddd5d43f	2024-05-08 13:38:13.532	2024	2025
21414874-7213-4f50-9722-e7c444ff7edf	f	2b9bc8ce-097d-4a86-bfdd-7080ddd5d43f	2024-05-08 12:54:01.214	2023	2024
a85908d3-9aff-43b8-aa6a-2e75341e9669	f	2b9bc8ce-097d-4a86-bfdd-7080ddd5d43f	2024-05-08 13:53:07.177	2022	2023
\.


--
-- Data for Name: Semester; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Semester" (id, semester, "semestralDateStart", "semestralDateEnd", "isActive", "schoolYearId", "userId", "createdAt") FROM stdin;
e95e2a97-33da-47ca-8c20-bf96bf3da101	First Semester	2024-05-09 02:44:44.837	2024-06-26 16:00:00	t	0c2678e1-75b8-4960-845c-659d7c54aabf	2b9bc8ce-097d-4a86-bfdd-7080ddd5d43f	2024-05-09 02:44:47.027
8d30f201-c722-4480-bfe2-640632f71135	Second Semester	2024-06-27 16:00:00	2024-09-25 16:00:00	f	0c2678e1-75b8-4960-845c-659d7c54aabf	2b9bc8ce-097d-4a86-bfdd-7080ddd5d43f	2024-05-09 03:13:16.835
11ac6dc6-c79e-4f1c-a17a-0ccd4d647e52	Summer	2024-09-25 16:00:00	2024-11-29 16:00:00	f	0c2678e1-75b8-4960-845c-659d7c54aabf	2b9bc8ce-097d-4a86-bfdd-7080ddd5d43f	2024-05-09 03:43:38.862
\.


--
-- Data for Name: Student; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Student" (id, "idNumber", "lastName", "firstName", "middleInitial", address, guardian, "guardianContact", "userId", "createdAt", "esignUrl", "photoUrl", "programId", "birthDate") FROM stdin;
d5bbc1f6-dc3a-49e0-bfb5-602be232256a	121234	Montoya	Ryan	P.	212121	Rhyan Montoya Sr.	12121	2b9bc8ce-097d-4a86-bfdd-7080ddd5d43f	2024-05-09 12:18:39.838	\N	\N	f76849db-f438-44e3-96e8-07a5e8b2030f	2024-05-07 16:00:00
\.


--
-- Data for Name: StudentUpdate; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."StudentUpdate" (id, "updatedDate", "userId", "studentId") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, username, "fullName", photo, role, email, "createdAt", "isActive", password) FROM stdin;
2b9bc8ce-097d-4a86-bfdd-7080ddd5d43f	admin	Ryan Montoya	\N	Admin	rmontoya.umtc@gmail.com	2024-05-05 19:17:38.969	t	$2y$10$lV5zY1E2A9X94INh2m7/iuKJ8cTcKqWRk0L2munCFNeWRNzxg4GEC
\.


--
-- Data for Name: Validation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Validation" (id, "studentId", "dateValidated", "schoolYearId", "semesterId", "userId") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
1c534dfd-251d-47a5-9005-828f032a4d84	ad26460e92005bbeb1c6ad1024e93133833425c93b54646369ce4e56bf2f2994	2024-05-05 19:13:05.125021+08	20240413020521_init	\N	\N	2024-05-05 19:13:05.116972+08	1
e9aa6b40-7917-4f98-948a-d234a593f0f4	0c183f45d2672282542461730b3ef0b4a94424be867da4d2a88f49000397b9df	2024-05-09 20:14:50.866823+08	20240509121450_init	\N	\N	2024-05-09 20:14:50.855443+08	1
3ed18c9a-8899-4c1c-a800-87d7d1eee250	bb668c1113c3d45339b39b7bf99b4792c2b2437a928ec9f51dad1a89ff63f77d	2024-05-05 19:13:05.188363+08	20240419112322_init	\N	\N	2024-05-05 19:13:05.125757+08	1
920e6074-acaa-4740-9968-1886bb58f53d	306b970b00f15fd727719eb8391f9697b19f42843925b0a74167a66c913ed195	2024-05-05 19:13:05.222999+08	20240419112603_init	\N	\N	2024-05-05 19:13:05.189216+08	1
d2db85ce-d772-4618-9cf0-555d7f0d19b8	fbe7dbf19171b954266fb0bb9b7738e4b55a959c5e3d1f4de4ee09bf49a4678a	2024-05-05 19:13:05.226041+08	20240419120528_init	\N	\N	2024-05-05 19:13:05.22367+08	1
80b61633-d3a5-43cd-8278-4987f185cd16	83bf0404f2fd173f30f851b349bdccafcb7e2438eb369fd133ff600235590081	2024-05-09 20:18:12.131341+08	20240509121812_init	\N	\N	2024-05-09 20:18:12.127087+08	1
325bbb6c-11b2-43bb-bc8b-b90722bd62d1	eb7b8daec0ee36044749897ffa29c96c41df26fac64762d6285882b2cbf3c99d	2024-05-05 19:13:05.229057+08	20240419124424_init	\N	\N	2024-05-05 19:13:05.226789+08	1
d09222db-d35f-49ed-8795-be267ed5e7c6	1631f0f1814517bc8a49334c981271e8dfc87ce6a780aaf4f680a6170545c848	2024-05-05 19:13:05.233633+08	20240419124708_init	\N	\N	2024-05-05 19:13:05.229586+08	1
21d36a3c-daab-4f64-a5f4-4b84f655e74e	8c58521b92f10c0dd32e48c63a579b6ac07a6ad0b6d6bd689b38308a94c89ed4	2024-05-05 19:13:06.797254+08	20240505111306_init	\N	\N	2024-05-05 19:13:06.79443+08	1
5a6b3a2b-2a8f-4c6e-a1e2-9a08b3b74293	e0756b9717f5b32d009dfd16b37f7e22f1e8a32cf6622d20a332e929982af14a	2024-05-05 20:39:18.2381+08	20240505123918_init	\N	\N	2024-05-05 20:39:18.23381+08	1
60b52955-b8fe-4ec0-8514-1230686029c5	de683b4ce65d631cff314289470dac00d9bf4c5de4c4ab2a5fa8766ad7c75cb9	2024-05-08 20:43:50.175772+08	20240508124350_init	\N	\N	2024-05-08 20:43:50.160914+08	1
cdc0221a-aa00-42bc-88ed-b938e7da6009	4655f67962a7db2fb17be177815f3e7e546e67554e1b82688b35d894a5d7d29e	2024-05-08 20:52:41.747752+08	20240508125241_init	\N	\N	2024-05-08 20:52:41.742343+08	1
1d2a6b03-8ebc-46cd-b581-7702062d78f0	64acc0a1589d4c3d2d79889301ea18d6e59a40276906f6d1f2c13c4eb51dfa6d	2024-05-09 10:03:45.158894+08	20240509020345_init	\N	\N	2024-05-09 10:03:45.146182+08	1
88988db0-63ca-4382-b18e-9ab205a9df42	de683b4ce65d631cff314289470dac00d9bf4c5de4c4ab2a5fa8766ad7c75cb9	2024-05-09 10:05:46.276045+08	20240509020546_init	\N	\N	2024-05-09 10:05:46.26478+08	1
d6897311-f250-4d27-8a37-e055a69a3beb	acd2f902c6880d66c7bfce49873cebf44ff7cbe93c4d567a0e630c4019ad8656	2024-05-09 19:27:51.64297+08	20240509112751_init	\N	\N	2024-05-09 19:27:51.638842+08	1
701c3775-f3ce-4e2f-b456-e29df7f7b17b	3b9684249963f015535b313fd134bba1a45c852161e15862c35e388e04540c18	2024-05-09 19:48:24.548189+08	20240509114824_init	\N	\N	2024-05-09 19:48:24.536953+08	1
\.


--
-- Name: Printing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Printing_id_seq"', 1, false);


--
-- Name: StudentUpdate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."StudentUpdate_id_seq"', 1, false);


--
-- Name: Validation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Validation_id_seq"', 1, false);


--
-- Name: Department Department_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Department"
    ADD CONSTRAINT "Department_pkey" PRIMARY KEY (id);


--
-- Name: Printing Printing_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Printing"
    ADD CONSTRAINT "Printing_pkey" PRIMARY KEY (id);


--
-- Name: Program Program_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program"
    ADD CONSTRAINT "Program_pkey" PRIMARY KEY (id);


--
-- Name: SchoolYear SchoolYear_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SchoolYear"
    ADD CONSTRAINT "SchoolYear_pkey" PRIMARY KEY (id);


--
-- Name: Semester Semester_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Semester"
    ADD CONSTRAINT "Semester_pkey" PRIMARY KEY (id);


--
-- Name: StudentUpdate StudentUpdate_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StudentUpdate"
    ADD CONSTRAINT "StudentUpdate_pkey" PRIMARY KEY (id);


--
-- Name: Student Student_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Validation Validation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Validation"
    ADD CONSTRAINT "Validation_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Student_idNumber_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Student_idNumber_key" ON public."Student" USING btree ("idNumber");


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: Department Department_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Department"
    ADD CONSTRAINT "Department_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Printing Printing_printedByUserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Printing"
    ADD CONSTRAINT "Printing_printedByUserId_fkey" FOREIGN KEY ("printedByUserId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Printing Printing_releasedByUserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Printing"
    ADD CONSTRAINT "Printing_releasedByUserId_fkey" FOREIGN KEY ("releasedByUserId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Printing Printing_schoolYearId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Printing"
    ADD CONSTRAINT "Printing_schoolYearId_fkey" FOREIGN KEY ("schoolYearId") REFERENCES public."SchoolYear"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Printing Printing_semesterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Printing"
    ADD CONSTRAINT "Printing_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES public."Semester"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Printing Printing_studentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Printing"
    ADD CONSTRAINT "Printing_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES public."Student"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Program Program_departmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program"
    ADD CONSTRAINT "Program_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES public."Department"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Program Program_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program"
    ADD CONSTRAINT "Program_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SchoolYear SchoolYear_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SchoolYear"
    ADD CONSTRAINT "SchoolYear_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Semester Semester_schoolYearId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Semester"
    ADD CONSTRAINT "Semester_schoolYearId_fkey" FOREIGN KEY ("schoolYearId") REFERENCES public."SchoolYear"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Semester Semester_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Semester"
    ADD CONSTRAINT "Semester_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: StudentUpdate StudentUpdate_studentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StudentUpdate"
    ADD CONSTRAINT "StudentUpdate_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES public."Student"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: StudentUpdate StudentUpdate_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StudentUpdate"
    ADD CONSTRAINT "StudentUpdate_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Student Student_programId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_programId_fkey" FOREIGN KEY ("programId") REFERENCES public."Program"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Student Student_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Validation Validation_schoolYearId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Validation"
    ADD CONSTRAINT "Validation_schoolYearId_fkey" FOREIGN KEY ("schoolYearId") REFERENCES public."SchoolYear"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Validation Validation_semesterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Validation"
    ADD CONSTRAINT "Validation_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES public."Semester"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Validation Validation_studentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Validation"
    ADD CONSTRAINT "Validation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES public."Student"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Validation Validation_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Validation"
    ADD CONSTRAINT "Validation_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

