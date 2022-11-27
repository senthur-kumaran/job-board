import { Company, Job } from "./db.js";

const rejectIf = (condition) => {
    if(condition) {
        throw new Error('Unauthorized');
    }
};

export const resolvers = {
    Query: {
        job: (_, { id }) => Job.findById(id),
        jobs: () => Job.findAll(),
        company: (_, { id }) => Company.findById(id),
    },
    Mutation: {
        createJob: (_, { input }, { user }) => {
            rejectIf(!user);
            return Job.create({ ...input, companyId: user.companyId });
        },
        deleteJob: async (_, { id }, { user }) => {
            rejectIf(!user);
            const job = await Job.findById(id);
            rejectIf(user.companyId !== job.companyId);
            return Job.delete(id);
        },
        updateJob: async (_, { input }, { user }) => {
            rejectIf(!user);
            const job = await Job.findById(input.id);
            rejectIf(user.companyId !== job.companyId);
            return Job.update({ ...input, companyId: user.companyId });
        },
    },
    Job: {
        company: (job) => Company.findById(job.companyId),
    },
    Company: {
        jobs: (company) => Job.findAll((job) => job.companyId === company.id)
    }
};