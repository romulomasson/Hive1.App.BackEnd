--
-- PostgreSQL database dump
--
-- Dumped from database version 9.6.10
-- Dumped by pg_dump version 9.6.10
BEGIN;
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;
--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--
CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--
COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
SET default_tablespace = '';
SET default_with_oids = false;
CREATE OR REPLACE FUNCTION public.uuid_generate_v4() RETURNS uuid LANGUAGE 'c' COST 1 VOLATILE STRICT PARALLEL SAFE AS '$libdir/uuid-ossp',
    'uuid_generate_v4';
ALTER FUNCTION public.uuid_generate_v4() OWNER TO postgres;
CREATE TYPE public.missao_recorrencia AS ENUM (
    'uma vez',
    'diario',
    'semanal',
    'mensal',
    'anual'
);
ALTER TYPE public.missao_recorrencia OWNER TO postgres;
CREATE TYPE public.missao_tipo AS ENUM ('Primario', 'Recorrente');
ALTER TYPE public.missao_tipo OWNER TO postgres;
CREATE TYPE public.objetivo_periodo AS ENUM ('Unico', 'Semanal');
ALTER TYPE public.objetivo_periodo OWNER TO postgres;
CREATE TYPE public.objetivo_tipo AS ENUM ('Principal', 'Gerais');
ALTER TYPE public.objetivo_tipo OWNER TO postgres;
CREATE TABLE IF NOT EXISTS public.default_table (
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY (
        INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1
    ),
    dt_cadastro timestamp with time zone NOT NULL,
    usuario_cadastro_id integer DEFAULT 1,
    dt_alteracao timestamp with time zone,
    usuario_alteracao_id integer,
    dt_exclusao time without time zone,
    usuario_exclusao_id integer,
    flag_ativo boolean,
    CONSTRAINT id_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.default_table OWNER to postgres;
CREATE TABLE public.banco (
    id SERIAL PRIMARY KEY,
    nro_banco character varying(100) NOT NULL,
    nome character varying(100) NOT NULL,
    descricao character varying(100) DEFAULT NULL::character varying,
    cnpj character varying(100) NOT NULL,
    site character varying(100) NOT NULL,
    ativo boolean,
    dt_cadastro TIMESTAMP WITH TIME ZONE NOT NULL,
    usuario_cadastro_id integer,
    dt_alteracao TIMESTAMP WITH TIME ZONE,
    usuario_alteracao_id integer,
    dt_exclusao TIMESTAMP WITH TIME ZONE,
    usuario_exclusao_id integer,
    motivo_exclusao character varying(100) DEFAULT NULL::character varying
);
ALTER TABLE public.banco OWNER TO postgres;
--
-- Name: notificacao; Type: TABLE; Schema: public; Owner: luisgustavo
--
CREATE TABLE public.notificacao (
    id SERIAL PRIMARY KEY,
    pessoa_id integer NOT NULL,
    perfil_acesso_id integer,
    titulo character varying(100) NOT NULL,
    descricao character varying(100) NOT NULL,
    ativo boolean,
    usuario_cadastro_id integer,
    dt_cadastro TIMESTAMP WITH TIME ZONE NOT NULL,
    usuario_alteracao_id integer,
    dt_alteracao TIMESTAMP WITH TIME ZONE,
    usuario_exclusao_id integer,
    dt_exclusao TIMESTAMP WITH TIME ZONE,
    motivo_exclusao character varying(100) DEFAULT NULL::character varying
);
ALTER TABLE public.notificacao OWNER TO postgres;
--
-- Name: notificacao_lida; Type: TABLE; Schema: public; Owner: luisgustavo
--
CREATE TABLE public.notificacao_lida (
    id SERIAL PRIMARY KEY,
    notificacao_id character varying(100) NOT NULL,
    pessoa_id integer NOT NULL,
    usuario_cadastro_id integer,
    dt_cadastro TIMESTAMP WITH TIME ZONE NOT NULL,
    usuario_alteracao_id integer,
    dt_alteracao TIMESTAMP WITH TIME ZONE,
    usuario_exclusao_id integer,
    dt_exclusao TIMESTAMP WITH TIME ZONE,
    motivo_exclusao character varying(100) DEFAULT NULL::character varying
);
ALTER TABLE public.notificacao_lida OWNER TO postgres;
--
-- Name: pessoa; Type: TABLE; Schema: public; Owner: luisgustavo
--
CREATE TABLE public.pessoa (
    id SERIAL PRIMARY KEY NOT NULL,
    uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
    perfil_acesso_id integer,
    tipo_rede_social_id integer,
    referencia_rede_social_id character varying(100) DEFAULT NULL::character varying,
    status_id integer,
    codigo character varying(12) NOT NULL,
    flag_tipo_pessoa character varying(100) DEFAULT NULL::character varying NOT NULL,
    tipo_documento_id character varying(100) DEFAULT NULL::character varying,
    nro_documento character varying(100) DEFAULT NULL::character varying,
    nome character varying(100) NOT NULL,
    apelido character varying(100) DEFAULT NULL::character varying,
    razao_social character varying(100) DEFAULT NULL::character varying,
    inscricao_estadual character varying(100) DEFAULT NULL::character varying,
    inscricao_municipal character varying(100) DEFAULT NULL::character varying,
    rg character varying(100) DEFAULT NULL::character varying,
    uf_rg character varying(100) DEFAULT NULL::character varying,
    orgao_emissor_rg character varying(100) DEFAULT NULL::character varying,
    pais_origem_id integer,
    nome_cidade_origem character varying(100) DEFAULT NULL::character varying,
    dt_nascimento TIMESTAMP WITH TIME ZONE,
    flag_sexo character varying(100) DEFAULT NULL::character varying,
    nome_pai character varying(100) DEFAULT NULL::character varying,
    nome_mae character varying(100) DEFAULT NULL::character varying,
    tel_principal character varying(100) DEFAULT NULL::character varying,
    tel_secundario character varying(100) DEFAULT NULL::character varying,
    flag_cadastro_aprovado boolean,
    dt_validacao_cadastro TIMESTAMP WITH TIME ZONE,
    email character varying(100) NOT NULL,
    dt_email_validacao TIMESTAMP WITH TIME ZONE,
    login character varying(100) DEFAULT NULL::character varying,
    senha character varying(128) NOT NULL,
    flag_alterar_senha boolean,
    observacoes character varying(100) DEFAULT NULL::character varying,
    tema_escolhido character varying(20) DEFAULT NULL::character varying,
    tamanho_camisa character varying(3) DEFAULT NULL::character varying,
    sms_verificado boolean,
    dt_cadastro TIMESTAMP WITH TIME ZONE NOT NULL,
    usuario_cadastro_id integer,
    dt_alteracao TIMESTAMP WITH TIME ZONE,
    usuario_alteracao_id integer,
    dt_exclusao TIMESTAMP WITH TIME ZONE,
    usuario_exclusao_id integer,
    motivo_exclusao character varying(100) DEFAULT NULL::character varying
);
ALTER TABLE public.pessoa OWNER TO postgres;
--
-- Name: pessoa_conta_bancaria; Type: TABLE; Schema: public; Owner: luisgustavo
--
CREATE TABLE public.pessoa_conta_bancaria (
    id SERIAL PRIMARY KEY,
    pessoa_id integer NOT NULL,
    banco_id integer NOT NULL,
    nro_agencia character varying(100) NOT NULL,
    digito_agencia character varying(100) DEFAULT NULL::character varying,
    nro_conta character varying(100) NOT NULL,
    digito_conta character varying(100) DEFAULT NULL::character varying,
    operacao_conta character varying(100) DEFAULT NULL::character varying,
    pix character varying(100) DEFAULT NULL::character varying,
    documento_titular character varying(100) NOT NULL,
    nome_titular character varying(100) NOT NULL,
    razao_social_titular character varying(100) NOT NULL,
    tipo_conta character varying(100) NOT NULL,
    descricao character varying(100) DEFAULT NULL::character varying,
    ativo boolean,
    flag_principal character varying(100) DEFAULT NULL::character varying,
    dt_cadastro TIMESTAMP WITH TIME ZONE NOT NULL,
    usuario_cadastro_id integer,
    dt_alteracao TIMESTAMP WITH TIME ZONE,
    usuario_alteracao_id integer,
    dt_exclusao TIMESTAMP WITH TIME ZONE,
    usuario_exclusao_id integer,
    motivo_exclusao character varying(100) DEFAULT NULL::character varying
);
ALTER TABLE public.pessoa_conta_bancaria OWNER TO postgres;
CREATE TABLE IF NOT EXISTS public.faq (
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY (
        INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1
    ),
    nome character varying(50) NOT NULL,
    tema character varying(50) NOT NULL,
    assunto character varying(100) NOT NULL,
    descricao text NOT NULL,
    pessoa_id integer NOT NULL,
    CONSTRAINT faq_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;
ALTER TABLE public.faq OWNER to postgres;
--
-- Name: pessoa_contato; Type: TABLE; Schema: public; Owner: luisgustavo
--
CREATE TABLE public.pessoa_contato (
    id SERIAL PRIMARY KEY,
    pessoa_id integer NOT NULL,
    tipo_contato_id integer,
    nome character varying(100) DEFAULT NULL::character varying,
    email character varying(100) DEFAULT NULL::character varying,
    tel_comercial character varying(100) DEFAULT NULL::character varying,
    tel_celular character varying(100) DEFAULT NULL::character varying,
    nextel character varying(100) DEFAULT NULL::character varying,
    observacao character varying(100) DEFAULT NULL::character varying,
    ativo boolean,
    dt_cadastro TIMESTAMP WITH TIME ZONE NOT NULL,
    usuario_cadastro_id integer,
    dt_alteracao TIMESTAMP WITH TIME ZONE,
    usuario_alteracao_id integer,
    dt_exclusao TIMESTAMP WITH TIME ZONE,
    usuario_exclusao_id integer,
    motivo_exclusao character varying(100) DEFAULT NULL::character varying
);
ALTER TABLE public.pessoa_contato OWNER TO postgres;
--
-- Name: pessoa_endereco; Type: TABLE; Schema: public; Owner: luisgustavo
--
CREATE TABLE public.pessoa_endereco (
    id SERIAL PRIMARY KEY,
    pessoa_id integer NOT NULL,
    pais_id integer,
    estado_id integer,
    uf character varying(100) NOT NULL,
    nome_cidade character varying(100) NOT NULL,
    tipo_endereco_id integer,
    cep character varying(100) DEFAULT NULL::character varying,
    logradouro character varying(100) NOT NULL,
    numero character varying(100) NOT NULL,
    complemento character varying(100) DEFAULT NULL::character varying,
    zona character varying(100) DEFAULT NULL::character varying,
    bairro character varying(100) DEFAULT NULL::character varying,
    dt_cadastro TIMESTAMP WITH TIME ZONE NOT NULL,
    usuario_cadastro_id integer,
    dt_alteracao TIMESTAMP WITH TIME ZONE,
    usuario_alteracao_id integer,
    dt_exclusao TIMESTAMP WITH TIME ZONE,
    usuario_exclusao_id integer,
    motivo_exclusao character varying(100) DEFAULT NULL::character varying
);
ALTER TABLE public.pessoa_endereco OWNER TO postgres;
--
-- Name: pessoa_historico; Type: TABLE; Schema: public; Owner: luisgustavo
--
CREATE TABLE public.pessoa_historico (
    id SERIAL PRIMARY KEY,
    pessoa_id integer NOT NULL,
    tipo_historico_id integer,
    data TIMESTAMP WITH TIME ZONE NOT NULL,
    observacao character varying(100) DEFAULT NULL::character varying,
    dt_cadastro TIMESTAMP WITH TIME ZONE NOT NULL,
    usuario_cadastro_id integer,
    dt_alteracao TIMESTAMP WITH TIME ZONE,
    usuario_alteracao_id integer,
    dt_exclusao TIMESTAMP WITH TIME ZONE,
    usuario_exclusao_id integer,
    motivo_exclusao character varying(100) DEFAULT NULL::character varying
);
ALTER TABLE public.pessoa_historico OWNER TO postgres;
--
-- Name: pessoa_jornada_trabalho; Type: TABLE; Schema: public; Owner: luisgustavo
--
CREATE TABLE public.pessoa_jornada_trabalho (
    id SERIAL PRIMARY KEY,
    uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
    pessoa_id integer NOT NULL,
    dia_semana character varying(100) NOT NULL,
    periodo character varying(100) NOT NULL,
    observacoes character varying(100) DEFAULT NULL::character varying,
    dt_cadastro TIMESTAMP WITH TIME ZONE NOT NULL,
    usuario_cadastro_id integer,
    dt_alteracao TIMESTAMP WITH TIME ZONE,
    usuario_alteracao_id integer,
    dt_exclusao TIMESTAMP WITH TIME ZONE,
    usuario_exclusao_id integer,
    motivo_exclusao character varying(100) DEFAULT NULL::character varying
);
ALTER TABLE public.pessoa_jornada_trabalho OWNER TO postgres;
--
-- Name: pessoa_status; Type: TABLE; Schema: public; Owner: luisgustavo
--
CREATE TABLE public.pessoa_status (
    id SERIAL PRIMARY KEY,
    descricao character varying(100) NOT NULL,
    dt_cadastro TIMESTAMP WITH TIME ZONE NOT NULL,
    usuario_cadastro_id integer,
    dt_alteracao TIMESTAMP WITH TIME ZONE,
    usuario_alteracao_id integer,
    dt_exclusao TIMESTAMP WITH TIME ZONE,
    usuario_exclusao_id integer,
    motivo_exclusao character varying(100) DEFAULT NULL::character varying
);
ALTER TABLE public.pessoa_status OWNER TO postgres;
--
-- Name: pessoa_tipo; Type: TABLE; Schema: public; Owner: luisgustavo
--
CREATE TABLE public.pessoa_tipo (
    id SERIAL PRIMARY KEY,
    pessoa_id integer NOT NULL,
    descricao character varying(100) NOT NULL,
    dt_cadastro TIMESTAMP WITH TIME ZONE NOT NULL,
    usuario_cadastro_id integer,
    dt_alteracao TIMESTAMP WITH TIME ZONE,
    usuario_alteracao_id integer,
    dt_exclusao TIMESTAMP WITH TIME ZONE,
    usuario_exclusao_id integer,
    motivo_exclusao character varying(100) DEFAULT NULL::character varying
);
ALTER TABLE public.pessoa_tipo OWNER TO postgres;
--
-- Name: politica_privacidade; Type: TABLE; Schema: public; Owner: luisgustavo
--
CREATE TABLE public.politica_privacidade (
    id SERIAL PRIMARY KEY,
    titulo character varying(100) NOT NULL,
    conteudo character varying(100) NOT NULL,
    ativo boolean,
    dt_cadastro TIMESTAMP WITH TIME ZONE NOT NULL,
    usuario_cadastro_id integer,
    dt_alteracao TIMESTAMP WITH TIME ZONE,
    usuario_alteracao_id integer,
    usuario_exclusao_id integer,
    dt_exclusao TIMESTAMP WITH TIME ZONE,
    motivo_exclusao character varying(100) DEFAULT NULL::character varying
);
ALTER TABLE public.politica_privacidade OWNER TO postgres;
--
-- Name: politica_privacidade_aceite; Type: TABLE; Schema: public; Owner: luisgustavo
--
CREATE TABLE public.politica_privacidade_aceite (
    id SERIAL PRIMARY KEY,
    politica_privacidade_id integer,
    pessoa_id integer NOT NULL,
    uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
    manufacturer character varying(100) DEFAULT NULL::character varying,
    model character varying(100) DEFAULT NULL::character varying,
    usuario_cadastro_id integer,
    dt_cadastro TIMESTAMP WITH TIME ZONE NOT NULL,
    usuario_alteracao_id integer,
    dt_alteracao TIMESTAMP WITH TIME ZONE,
    usuario_exclusao_id integer,
    dt_exclusao TIMESTAMP WITH TIME ZONE,
    motivo_exclusao character varying(100) DEFAULT NULL::character varying
);
ALTER TABLE public.politica_privacidade_aceite OWNER TO postgres;
--
-- Name: tipo_contato; Type: TABLE; Schema: public; Owner: luisgustavo
--
CREATE TABLE public.tipo_contato (
    id SERIAL PRIMARY KEY,
    descricao character varying(100) NOT NULL,
    ativo boolean,
    dt_cadastro TIMESTAMP WITH TIME ZONE NOT NULL,
    usuario_cadastro_id integer,
    dt_alteracao TIMESTAMP WITH TIME ZONE,
    usuario_alteracao_id integer,
    dt_exclusao TIMESTAMP WITH TIME ZONE,
    usuario_exclusao_id integer,
    motivo_exclusao character varying(100) DEFAULT NULL::character varying
);
ALTER TABLE public.tipo_contato OWNER TO postgres;
--
-- Name: tipo_documento; Type: TABLE; Schema: public; Owner: luisgustavo
--
CREATE TABLE public.tipo_documento (
    id SERIAL PRIMARY KEY,
    nome character varying(100) NOT NULL,
    descricao character varying(100) NOT NULL,
    flag_pf character varying(100) DEFAULT NULL::character varying,
    flag_pj character varying(100) DEFAULT NULL::character varying,
    ativo boolean,
    dt_cadastro TIMESTAMP WITH TIME ZONE NOT NULL,
    usuario_cadastro_id integer,
    dt_alteracao TIMESTAMP WITH TIME ZONE,
    usuario_alteracao_id integer,
    dt_exclusao TIMESTAMP WITH TIME ZONE,
    usuario_exclusao_id integer,
    motivo_exclusao character varying(100) DEFAULT NULL::character varying
);
ALTER TABLE public.tipo_documento OWNER TO postgres;
--
-- Name: tipo_endereco; Type: TABLE; Schema: public; Owner: luisgustavo
--
CREATE TABLE public.tipo_endereco (
    id SERIAL PRIMARY KEY,
    descricao character NOT NULL,
    ativo boolean,
    dt_cadastro TIMESTAMP WITH TIME ZONE NOT NULL,
    usuario_cadastro_id integer,
    dt_alteracao TIMESTAMP WITH TIME ZONE,
    usuario_alteracao_id integer,
    dt_exclusao TIMESTAMP WITH TIME ZONE,
    usuario_exclusao_id integer,
    motivo_exclusao character varying(100) DEFAULT NULL::character varying
);
ALTER TABLE public.tipo_endereco OWNER TO postgres;
--
-- Name: tipo_historico; Type: TABLE; Schema: public; Owner: luisgustavo
--
CREATE TABLE public.tipo_historico (
    id SERIAL PRIMARY KEY,
    descricao character varying(100) DEFAULT NULL::character varying,
    ativo boolean,
    dt_cadastro TIMESTAMP WITH TIME ZONE NOT NULL,
    usuario_cadastro_id integer,
    dt_alteracao TIMESTAMP WITH TIME ZONE,
    usuario_alteracao_id integer,
    dt_exclusao TIMESTAMP WITH TIME ZONE,
    usuario_exclusao_id integer
);
ALTER TABLE public.tipo_historico OWNER TO postgres;
--
-- Name: tipo_rede_social; Type: TABLE; Schema: public; Owner: luisgustavo
--
CREATE TABLE public.tipo_rede_social (
    id integer PRIMARY KEY,
    descricao character varying(100) NOT NULL,
    ativo boolean,
    dt_cadastro TIMESTAMP WITH TIME ZONE NOT NULL,
    usuario_cadastro_id integer,
    dt_alteracao TIMESTAMP WITH TIME ZONE,
    usuario_alteracao_id integer,
    dt_exclusao TIMESTAMP WITH TIME ZONE,
    usuario_exclusao_id integer
);
ALTER TABLE public.tipo_rede_social OWNER TO postgres;
CREATE TABLE IF NOT EXISTS public.pessoa_imagens (
    id SERIAL,
    uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
    pessoa_id integer NOT NULL,
    img_face character varying COLLATE pg_catalog."default",
    img_doc_back character varying COLLATE pg_catalog."default",
    img_doc_front character varying COLLATE pg_catalog."default",
    img_self_doc character varying COLLATE pg_catalog."default",
    img_avatar character varying COLLATE pg_catalog."default",
    CONSTRAINT pessoa_imagens_pkey PRIMARY KEY (pessoa_id)
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.pessoa_imagens OWNER to postgres;
CREATE TABLE IF NOT EXISTS public.tipo_tema (
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY (
        INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1
    ),
    uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
    descricao character varying(50) NOT NULL,
    dt_cadastro TIMESTAMP WITH TIME ZONE NOT NULL,
    foto text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT tipo_tema_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.tipo_tema OWNER to postgres;
-- Table: public.pessoa_tema
-- DROP TABLE IF EXISTS public.pessoa_tema;
CREATE TABLE IF NOT EXISTS public.pessoa_tema (
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY (
        INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1
    ),
    uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
    pessoa_id integer NOT NULL,
    tema_id integer NOT NULL,
    CONSTRAINT pesssoa_tema_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.pessoa_tema OWNER to postgres;
CREATE TABLE IF NOT EXISTS public.pessoa_convite (
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY (
        INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1
    ),
    pessoa_id integer NOT NULL,
    pessoa_convidada_id integer NOT NULL,
    dt_cadastro TIMESTAMP WITH TIME ZONE NOT NULL,
    CONSTRAINT pessoa_convite_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.pessoa_convite OWNER to postgres;
CREATE TABLE IF NOT EXISTS public.pessoa_pontos (
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY (
        INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1
    ),
    uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
    pessoa_id integer NOT NULL,
    pontos integer NOT NULL DEFAULT 0,
    dt_alteracao timestamp with time zone NOT NULL,
    dt_cadastro timestamp with time zone NOT NULL,
    CONSTRAINT pessoa_pontos_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.pessoa_pontos OWNER to postgres;
CREATE TABLE IF NOT EXISTS public."query-result-cache" (
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY (
        INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1
    ),
    identifier character varying COLLATE pg_catalog."default",
    "time" bigint NOT NULL,
    duration integer NOT NULL,
    query text COLLATE pg_catalog."default" NOT NULL,
    result text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY (id)
) TABLESPACE pg_default;
CREATE TABLE IF NOT EXISTS public.sistema_meta (
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY (
        INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1
    ),
    key character varying COLLATE pg_catalog."default" NOT NULL,
    value json,
    CONSTRAINT sistema_meta_pkey PRIMARY KEY (id),
    CONSTRAINT unique_key_name UNIQUE (key) INCLUDE(key)
) TABLESPACE pg_default;
ALTER TABLE public.sistema_meta OWNER to postgres;
CREATE UNIQUE INDEX unique_key_name ON public.sistema_meta USING btree (key COLLATE pg_catalog."default" ASC NULLS LAST) TABLESPACE pg_default;
CREATE TABLE IF NOT EXISTS public.objetivo_missao (
    -- Inherited from table public.default_table: id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    -- Inherited from table public.default_table: dt_cadastro timestamp with time zone NOT NULL,
    -- Inherited from table public.default_table: usuario_cadastro_id integer DEFAULT 1,
    -- Inherited from table public.default_table: dt_alteracao timestamp with time zone,
    -- Inherited from table public.default_table: usuario_alteracao_id integer,
    -- Inherited from table public.default_table: dt_exclusao time without time zone,
    -- Inherited from table public.default_table: usuario_exclusao_id integer,
    objetivo_id integer NOT NULL,
    tipo missao_tipo NOT NULL,
    recorrencia missao_recorrencia NOT NULL,
    descricao character varying(255) COLLATE pg_catalog."default",
    pontos integer,
    -- Inherited from table public.default_table: flag_ativo boolean,
    CONSTRAINT pk PRIMARY KEY (id),
    CONSTRAINT objetivo_id FOREIGN KEY (objetivo_id) REFERENCES public.objetivo (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
) INHERITS (public.default_table) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.objetivo_missao OWNER to postgres;
CREATE TABLE IF NOT EXISTS public.objetivo (
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY (
        INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1
    ),
    titulo character varying(100) COLLATE pg_catalog."default" NOT NULL,
    tipo objetivo_tipo NOT NULL,
    periodo objetivo_periodo NOT NULL,
    dt_cadastro timestamp with time zone NOT NULL,
    usuario_cadastro_id integer DEFAULT 1,
    dt_alteracao timestamp with time zone,
    usuario_alteracao_id integer,
    dt_exclusao timestamp with time zone,
    usuario_exclusao_id integer,
    flag_ativo boolean,
    fixo boolean DEFAULT false,
    CONSTRAINT pkey PRIMARY KEY (id)
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.objetivo OWNER to postgres;
CREATE TABLE IF NOT EXISTS public.old_missao (
    id integer NOT NULL DEFAULT nextval('missao_id_seq'::regclass),
    pai_id integer,
    titulo character varying(255) COLLATE pg_catalog."default",
    descricao character varying(3000) COLLATE pg_catalog."default",
    pontos integer,
    dt_fim timestamp with time zone,
    dt_inicio timestamp with time zone,
    motivo_exclusao character varying(255) COLLATE pg_catalog."default",
    ativo boolean NOT NULL,
    dt_cadastro timestamp with time zone NOT NULL,
    usuario_cadastro_id integer,
    dt_alteracao timestamp with time zone,
    usuario_alteracao_id integer,
    dt_exclusao timestamp with time zone,
    usuario_exclusao_id integer,
    tipo character varying(25) COLLATE pg_catalog."default",
    recorrencia character varying(25) COLLATE pg_catalog."default",
    CONSTRAINT missao_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.old_missao OWNER to postgres;
CREATE TABLE IF NOT EXISTS public.pessoa_objetivo_missao (
    id integer NOT NULL DEFAULT nextval('pessoa_id_seq'::regclass),
    objetivo_id integer,
    pessoa_id integer,
    dt_inicio timestamp with time zone,
    dt_conclusao timestamp with time zone,
    usuario_exclusao_id integer,
    ativo boolean,
    dt_cadastro timestamp with time zone,
    usuario_cadastro_id integer,
    dt_alteracao timestamp with time zone,
    usuario_alteracao_id integer,
    dt_exclusao timestamp with time zone,
    missao_id integer,
    CONSTRAINT pessoa_missao_pkey PRIMARY KEY (id),
    CONSTRAINT missao_id FOREIGN KEY (missao_id) REFERENCES public.objetivo_missao (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID,
    CONSTRAINT obj_id FOREIGN KEY (objetivo_id) REFERENCES public.objetivo (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID,
    CONSTRAINT pessoa_id FOREIGN KEY (pessoa_id) REFERENCES public.pessoa (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.pessoa_objetivo_missao OWNER to postgres;
COMMIT;